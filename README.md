# garagentor-antriebe

Rebuild of garagentor-antriebe.ch as a simple static 3-page site.

## Pages

- `index.html` - Startseite (Hero, Produkte, Torarten, Zubehör)
- `bestellung.html` - Bestellung / Offerte Formular
- `kontakt.html` - Kontaktinformationen + Kontaktformular
- `danke.html` - Bestätigung nach Formular-Submit

## Forms (Netlify)

Forms use Netlify Forms via `data-netlify="true"`. After deploy, submissions
are visible in the Netlify dashboard. Configure email notifications under
*Site settings → Forms → Form notifications*.

## Local development

```sh
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000/.

## Deployment

Hosted on Netlify (private repo). `netlify.toml` configures publish dir and
basic security headers. Connect the repo in Netlify and deploy - no build
step required.
