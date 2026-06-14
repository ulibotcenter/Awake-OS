# Restore Pre–Book-Cover Palette

Backups created before applying the exact book cover color palette.

## Files backed up

- `globals.css` → `backups/palette-pre-cover/globals.css`
- `tokens.css` → `backups/palette-pre-cover/tokens.css`
- `layout.tsx` → `backups/palette-pre-cover/layout.tsx`
- `page.tsx` → `backups/palette-pre-cover/page.tsx`

## How to revert

From the project root, run:

```bash
cp backups/palette-pre-cover/globals.css app/globals.css
cp backups/palette-pre-cover/tokens.css src/styles/tokens.css
cp backups/palette-pre-cover/layout.tsx app/layout.tsx
cp backups/palette-pre-cover/page.tsx app/page.tsx
```

Then restart the dev server:

```bash
npm run dev
```