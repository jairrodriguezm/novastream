import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { WatchlistButton } from './WatchlistButton';
import * as watchlistActions from '../actions/watchlist.actions';

describe('<WatchlistButton />', () => {
  it('debe actualizar la UI de manera optimista al hacer clic', async () => {
    const user = userEvent.setup();

    // Mockeamos la Server Action con un retraso para verificar el estado intermedio
    let resolveAction: (val: boolean) => void = () => {};
    const deferredPromise = new Promise<boolean>((resolve) => {
      resolveAction = resolve;
    });

    vi.spyOn(watchlistActions, 'toggleWatchlistAction').mockImplementation(() => deferredPromise);

    const view = render(<WatchlistButton mediaId="movie-101" initialIsSaved={false} />);

    const button = view.getByRole('button', { name: /\+ Agregar a Mi Lista/i });
    expect(button).toBeInTheDocument();

    // Simular clic del usuario
    await user.click(button);

    // 1. Verificación Optimista Inmediata (<16ms, sin esperar la red)
    expect(view.getByRole('button', { name: /✓ En Mi Lista/i })).toBeInTheDocument();
    expect(view.getByText(/\(Sincronizando\.\.\.\)/i)).toBeInTheDocument();

    // 2. Resolver la Server Action en el servidor
    resolveAction(true);

    // Esperar a que la transición termine
    await view.findByRole('button', { name: /✓ En Mi Lista/i });
    expect(view.queryByText(/\(Sincronizando\.\.\.\)/i)).not.toBeInTheDocument();
  });
});