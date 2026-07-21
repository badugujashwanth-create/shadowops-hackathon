import { expect, test } from '@playwright/test';
import path from 'node:path';

const baseUrl = process.env.DEMO_BASE_URL;
if (!baseUrl) throw new Error('Set DEMO_BASE_URL to the healthy local application URL.');

const repositoryRoot = path.resolve(__dirname, '..');

test.setTimeout(300_000);

test.use({
  viewport: { width: 1280, height: 720 },
  video: { mode: 'on', size: { width: 1280, height: 720 } },
});

test('ShadowOps attribution-safe local runtime walkthrough', async ({ page }) => {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await expect(page.getByText(/Local backend online/)).toBeVisible({ timeout: 15_000 });
  await expect(page.getByRole('heading', { name: 'ShadowOps Mission Control' })).toBeVisible();
  await page.screenshot({ path: path.join(repositoryRoot, 'docs/assets/screenshots/overview.png') });
  await page.screenshot({ path: path.join(repositoryRoot, 'docs/demo/demo-thumbnail.png') });
  await page.waitForTimeout(22_000);

  await page.getByRole('button', { name: 'Mission Control', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Mission Control Dashboard', exact: true })).toBeVisible();
  await page.waitForTimeout(22_000);

  await page.getByRole('button', { name: /AWS public S3 exfiltration/ }).click();
  await expect(page.getByText('Make S3 bucket publicly readable')).toBeVisible();
  await page.waitForTimeout(18_000);

  const runEvaluation = page.getByRole('button', { name: 'Run local evaluation', exact: true });
  await runEvaluation.scrollIntoViewIfNeeded();
  await runEvaluation.click();
  await expect(page.getByText(/Local backend decision/)).toBeVisible({ timeout: 15_000 });
  await page.mouse.move(640, 360);
  await page.mouse.wheel(0, -1_500);
  await page.waitForTimeout(28_000);

  const localFork = page.getByRole('button', { name: 'Set local FORK', exact: true });
  await localFork.scrollIntoViewIfNeeded();
  await localFork.click();
  await expect(page.getByText(/Local-only FORK override/)).toBeVisible();
  await page.mouse.move(640, 360);
  await page.mouse.wheel(0, -1_500);
  await page.waitForTimeout(20_000);

  await page.getByRole('button', { name: 'Quarantine', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Quarantine Resolution', exact: true })).toBeVisible();
  await page.waitForTimeout(23_000);

  await page.getByRole('button', { name: 'Benchmarks', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Benchmark Dashboard', exact: true })).toBeVisible();
  await expect(page.getByText('99%', { exact: true })).toBeVisible();
  await page.waitForTimeout(30_000);

  await page.getByRole('button', { name: 'Incident Report', exact: true }).click();
  await expect(page.getByText('Detailed analysis and recommendations')).toBeVisible();
  await page.waitForTimeout(22_000);

  await page.getByRole('button', { name: 'Run Another Scenario', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Mission Control Dashboard', exact: true })).toBeVisible();
  await page.waitForTimeout(20_000);
});
