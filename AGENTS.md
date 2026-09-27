<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep service, professional, and gallery sample content in the shared barber-data module so the four pages and booking flow present the same information.
- Keep booking state in a shared React provider and send completed requests to WhatsApp without storing personal details, because this is a frontend-only site.
- Use TanStack Start file routes and Tailwind v4 semantic tokens for this site, because the project template does not use React Router or a Tailwind JS config.
