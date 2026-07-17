# IOC History Module

Implemented:
- React Router application structure
- Shared responsive navigation
- `/history` and 404 routes
- Successful lookup persistence in localStorage
- Duplicate IOC replacement and 50-item limit
- History page header and total count
- Search by IOC value
- Filter by IOC type
- Sort by date or risk score
- Re-run lookup from history
- Delete individual entries
- Clear all history with confirmation
- Empty and filtered-empty states
- Responsive history cards

Validation completed:
- `npm run lint`
- `npm run build`

Security note:
- Runtime `.env` files and `node_modules` are excluded from this archive.
- Copy `server/.env.example` to `server/.env` and add fresh API keys locally.
