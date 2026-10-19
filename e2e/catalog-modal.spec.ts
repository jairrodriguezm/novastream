import { test, expect } from '@playwright/test';

test.describe('Catálogo OTT — Navegación de Modal e Intercepción', () => {
  test('debe abrir la ruta interceptada como modal y preservar la vista del catálogo', async ({ page }) => {
    await page.goto('/');

    // 1. Esperar que el Hero Banner esté visible
    const heroTitle = page.getByRole('heading', { level: 1 });
    await expect(heroTitle).toBeVisible();

    // 2. Hacer clic en la primera tarjeta de película disponible
    const firstCard = page.locator('a[href^="/watch/"]').first();
    await expect(firstCard).toBeVisible();

    const targetHref = await firstCard.getAttribute('href');
    expect(targetHref).toBeTruthy();

    await firstCard.click();

    // 3. Validar que la URL cambió en el navegador sin recargar toda la página
    await expect(page).toHaveURL(new RegExp(targetHref!));

    // 4. Validar que el modal interceptado está montado en el DOM
    const modalDialog = page.getByRole('dialog');
    await expect(modalDialog).toBeVisible();
    await expect(page.getByText('MODAL INTERCEPTADO')).toBeVisible();

    // 5. Cerrar el modal con la tecla Escape
    await page.keyboard.press('Escape');
    await expect(modalDialog).not.toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('debe cargar la vista dedicada completa al recargar (Hard Reload) sobre la ruta /watch/[id]', async ({ page }) => {
    // Navegar directamente a una URL profunda de reproducción
    await page.goto('/watch/trending-1');

    // Debe cargar la página dedicada y NO el modal interceptado
    await expect(page.getByText(/Ruta Dedicada Completa/i)).toBeVisible();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Enlace de retorno al catálogo funcional
    const backLink = page.getByRole('link', { name: /Volver al Catálogo/i });
    await expect(backLink).toBeVisible();
    await backLink.click();

    await expect(page).toHaveURL('/');
  });
});