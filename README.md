# Grain Site Designer

Plan a grain handling site on a satellite map, then look at it in 3D — bins, legs,
conveyors, dryers, pits, load-outs and generators — with build phasing, cost
estimating and an electrical load estimate.

**Live:** https://wes-cpu.github.io/grain-site-designer/

It is one self-contained `index.html`. Open it from the link above, from a local
copy, or install it to a phone or desktop home screen as an app.

---

## What it does

**Layout** — Draw on Esri satellite imagery or work in a 3D view of the same site.
Drag anything to move it; equipment that is connected follows along.

- **Bins** — stiffened or unstiffened sidewalls, flat or hopper bottom
  (GSI NCHTC 40°/45°/60° hoppers), total peak height entered the way a bin
  quote states it, aeration fans, and unloaders that extend out past the wall.
- **Legs** — bucket elevators with spouts, bin routing, and **shared gravity
  pipes** so two legs feeding the same bins tee into one pipe run.
- **Conveyors** — augers, drags, inclined chain conveyors (GSI Select Hi-Flight
  box sizes), **double-run** (twin stacked tubes, 8/10/12/14″) and **triple-run**
  (Sukup, three runs in one low-profile housing, receiving or reclaim).
- **Dryers** — portable stacked-module (GSI 2322 preset) or tower, with per-module
  dimensions, leg elevation, and fans placed by module, mount face and position.
- **Pits** — direct-burial concrete hopper, or a drive-over pit with dual grates
  over a shallow trench conveyor (Sudenga SDDO style).

**Planning**

- **Build phases** — unlimited, named and color-coded. Mark existing equipment
  with the phase it gets torn down in, and the 3D view shows the site *as it
  stands* in any phase.
- **Cost estimating** — per-object equipment cost plus infrastructure line items.
- **Electrical load** — horsepower per motor (auto-estimated for conveyors and
  augers), kW at HP × 0.7457, motor-starting inrush, operating modes for what
  actually runs at once, and generator sizing.

---

## Saving your work

Three layers, in increasing reach:

1. **Automatic** — the current layout is always kept in the browser it was built in.
2. **Linked data file** — *File → Link Data File* points the app at a `.json` file
   (for example in OneDrive) that it auto-saves to, so one person's work follows
   them between their own computers. Chrome or Edge only.
3. **Cloud projects** — sign in and save named projects to the cloud, then share
   any of them with other people by email.

### Cloud projects and sharing

Click **☁ Sign In**, enter an email address, and open the one-time link that
arrives. No password.

Every project is **private to whoever created it** until it is shared. On any of
your own projects, **👥 Share** adds a person by email at one of two levels:

| Access | They can |
| --- | --- |
| **Can view** | open the project, and take **⧉ My copy** into their own account |
| **Can view & edit** | all of the above, plus save changes back to your project |

Only the owner can delete a project or change who it is shared with. You can
share with someone who has never signed in — the project appears for them the
first time they sign in with that address.

This is enforced in Postgres by row-level security, not just in the page, so a
project nobody shared with you is not reachable even through the API.

---

## Running it yourself

Nothing to build. Serve the folder, or just open `index.html`.

```bash
python -m http.server 8000
```

Cloud sign-in needs a Supabase project (this app uses its own, separate from
any other app's). The database side is three tables and their policies
(`gsd_profiles`, `gsd_projects`, `gsd_project_shares`) plus helper functions in
a non-exposed `private` schema; point `SB_URL` and `SB_ANON` near the bottom of
`index.html` at your own project. The anon key is meant to be public —
row-level security is what protects the data.

In **Supabase → Authentication → URL Configuration**, set the **Site URL** to
wherever the app is served from and add it to **Redirect URLs**, or the sign-in
link will bounce somewhere else.

---

## Credits

Third-party libraries load from CDN: [Leaflet](https://leafletjs.com/) for the
map, [Three.js](https://threejs.org/) for the 3D view,
[supabase-js](https://supabase.com/docs/reference/javascript) for sign-in.
Imagery © Esri. Equipment dimensions referenced from published GSI, Sukup and
Sudenga product literature; verify anything load-bearing against current
manufacturer specs and your own electrician before building.
