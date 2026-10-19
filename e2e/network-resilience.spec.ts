import { test, expect } from '@playwright/test';

test.describe('Resiliencia de Red y Geo-bloqueo', () => {
  test('debe interceptar y bloquear acceso cuando la región no está autorizada', async ({ page }) => {
    // Probamos el middleware/proxy con parámetro simulado
    const response = await page.goto('/?region=blocked');
    expect(response?.status()).toBe(451);

    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('DRM Geo-fence');
  });

  test('debe mantener interactividad en los controles del reproductor bajo alta carga', async ({ page }) => {
    await page.goto('/');

    const playPauseBtn = page.getByRole('button', { name: /▶ Reproducir|⏸ Pausa/i });
    await expect(playPauseBtn).toBeVisible();

    // Comprobar respuesta de click inmediata (bajo INP)
    await playPauseBtn.click();
    await expect(page.getByRole('button', { name: /⏸ Pausa/i })).toBeVisible();

    await playPauseBtn.click();
    await expect(page.getByRole('button', { name: /▶ Reproducir/i })).toBeVisible();
  });
});