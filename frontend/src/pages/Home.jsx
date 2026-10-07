/**
 * Page d'accueil publique.
 * Les textes, modules, étapes et liens viennent de src/config/accueil.js et src/config/site.js.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Database, LogIn, Megaphone, UserPlus } from 'lucide-react';
import { SITE } from '../config/site';
import { ACCES_DIRECTS, AVANTAGES, COULEURS, FICHE, MODULES, PARCOURS } from '../config/accueil';
import { useAuth } from '../lib/auth';

function Pastille({ couleur, icone: Icone, taille = 'h-11 w-11', iconeTaille = 'h-5 w-5' }) {
  return (
    <span className={`inline-flex ${taille} shrink-0 items-center justify-center rounded-xl text-white shadow-sm ${COULEURS[couleur].fond}`}>
      <Icone className={iconeTaille} />
    </span>
  );
}

/** Le « cœur » : la base des fidèles et les 6 modules en orbite autour. */
function Hub() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="absolute inset-[13%] rounded-full border-2 border-dashed border-slate-300" />
      <div className="absolute inset-[30%] rounded-full bg-[#0f1f4b]/5" />

      <div className="absolute left-1/2 top-1/2 flex aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#0f1f4b] p-4 text-center text-white shadow-2xl shadow-[#0f1f4b]/30">
        <Database className="mb-1 h-7 w-7 text-amber-300" />
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Base unique</div>
        <div className="font-display text-2xl font-semibold leading-tight lg:text-3xl">Les Fidèles</div>
        <div className="mt-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold">1 fidèle = 1 fiche</div>
      </div>

      {MODULES.map((m, i) => {
        const angle = (-90 + i * 60) * (Math.PI / 180);
        const style = { left: `${50 + Math.cos(angle) * 37}%`, top: `${50 + Math.sin(angle) * 37}%` };
        return (
          <Link key={m.titre} to={m.lien} style={style}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-2xl bg-white py-2 pl-2 pr-3.5 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200 transition hover:-translate-y-[55%] hover:shadow-xl">
            <Pastille couleur={m.couleur} icone={m.icone} taille="h-9 w-9" iconeTaille="h-4 w-4" />
            <span className="text-sm font-bold text-slate-800">{m.titre}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const espace = user ? '/tableau-de-bord' : '/connexion';

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-slate-800">
      {SITE.annonce && (
        <div className="bg-[#0f1f4b] px-4 py-2 text-center text-sm text-white">
          <Megaphone className="mr-2 inline h-4 w-4 text-amber-300" />{SITE.annonce}
        </div>
      )}

      {/* Navigation */}
      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={SITE.logo} alt="" className="h-11 w-11" />
          <div className="leading-tight">
            <div className="font-display text-xl font-semibold text-[#0f1f4b]">{SITE.nom}</div>
            <div className="text-xs text-slate-500">{SITE.nomApplication}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
          <a href="#modules" className="hover:text-[#0f1f4b]">Modules</a>
          <a href="#parcours" className="hover:text-[#0f1f4b]">Parcours</a>
          <a href="#avantages" className="hover:text-[#0f1f4b]">Avantages</a>
        </nav>
        <div className="flex gap-2">
          <Link to="/inscription" className="btn hidden bg-white text-[#0f1f4b] ring-1 ring-slate-300 hover:bg-slate-50 sm:inline-flex">
            <UserPlus className="h-4 w-4" /> Je suis nouveau
          </Link>
          <Link to={espace} className="btn bg-[#0f1f4b] text-white hover:bg-[#1a2f66]">
            <LogIn className="h-4 w-4" /> {user ? 'Mon espace' : 'Se connecter'}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-6 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:pt-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0f1f4b] ring-1 ring-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Plateforme centralisée · {SITE.sousTitre}
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-[#0f1f4b] sm:text-5xl lg:text-6xl">
            Une seule base de données.<br />
            <span className="italic text-amber-600">Les fidèles</span> au cœur de tout.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            De la première rencontre jusqu'au service, chaque personne a <b>une fiche unique</b> que tous les
            départements partagent : évangélisation, accueil, discipolat, familles d'impact et ministères.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={espace} className="btn bg-[#0f1f4b] px-6 py-3 text-base text-white hover:bg-[#1a2f66]">
              Accéder à mon espace <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/inscription" className="btn bg-amber-400 px-6 py-3 text-base text-[#0f1f4b] hover:bg-amber-300">
              <UserPlus className="h-4 w-4" /> Je suis nouveau
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {SITE.vision.map((v) => (
              <span key={v} className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600">{v}</span>
            ))}
          </div>
        </div>

        <div className="hidden md:block"><Hub /></div>

        {/* Version mobile du hub */}
        <div className="rounded-3xl bg-[#0f1f4b] p-6 text-white md:hidden">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-amber-300" />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-300">Base unique</div>
              <div className="font-display text-2xl font-semibold">Les Fidèles</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {MODULES.map((m) => (
              <Link key={m.titre} to={m.lien} className="flex items-center gap-2 rounded-xl bg-white/10 p-2 text-sm font-semibold">
                <Pastille couleur={m.couleur} icone={m.icone} taille="h-8 w-8" iconeTaille="h-4 w-4" /> {m.titre}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que contient la fiche */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-6 md:px-8">
          <span className="font-display text-lg font-semibold text-[#0f1f4b]">Dans chaque fiche :</span>
          {FICHE.map((f) => (
            <span key={f} className="flex items-center gap-1.5 text-sm text-slate-600"><Check className="h-4 w-4 text-emerald-600" />{f}</span>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="mx-auto max-w-7xl scroll-mt-6 px-4 py-20 md:px-8">
        <div className="max-w-2xl">
          <div className="text-sm font-bold uppercase tracking-widest text-amber-600">Les espaces</div>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#0f1f4b] md:text-4xl">Six espaces, une seule fiche</h2>
          <p className="mt-3 text-slate-600">Chaque département travaille dans son espace, et tout ce qu'il fait est relié à la fiche du fidèle.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => {
            const c = COULEURS[m.couleur];
            return (
              <Link key={m.titre} to={m.lien}
                className={`group flex flex-col rounded-3xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 ${c.bord}`}>
                <div className="flex items-center gap-3">
                  <Pastille couleur={m.couleur} icone={m.icone} />
                  <h3 className="font-display text-xl font-semibold text-[#0f1f4b]">{m.titre}</h3>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-slate-600">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.fond}`} />{p}
                    </li>
                  ))}
                </ul>
                <span className={`mt-6 inline-flex items-center gap-1 text-sm font-bold ${c.texte}`}>
                  Ouvrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Parcours */}
      <section id="parcours" className="scroll-mt-6 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-widest text-amber-600">Le parcours</div>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[#0f1f4b] md:text-4xl">D'une rencontre à une vie engagée</h2>
          </div>
          <ol className="relative mt-14 grid gap-8 lg:grid-cols-6 lg:gap-4">
            <div className="absolute left-[8%] right-[8%] top-7 hidden h-0.5 bg-gradient-to-r from-emerald-400 via-violet-400 to-[#0f1f4b] lg:block" />
            {PARCOURS.map((e, i) => (
              <li key={e.titre} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                <div className="relative">
                  <Pastille couleur={e.couleur} icone={e.icone} taille="h-14 w-14" iconeTaille="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-black text-[#0f1f4b] ring-2 ring-slate-200">{i + 1}</span>
                </div>
                <div>
                  <div className="font-bold text-[#0f1f4b] lg:mt-4">{e.titre}</div>
                  <div className="mt-1 text-sm text-slate-500">{e.texte}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Avantages */}
      <section id="avantages" className="scroll-mt-6 px-4 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[2rem] bg-[#0f1f4b] p-8 text-white md:p-14 lg:grid-cols-2">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-amber-300">Pourquoi un système unifié</div>
            <p className="mt-4 font-display text-3xl font-semibold leading-snug md:text-4xl">
              Toutes les actions, suivis et affectations sont reliés à la fiche unique du fidèle.
            </p>
            <p className="mt-4 text-slate-300">Un système unifié pour une Église connectée et efficace.</p>
            <Link to={espace} className="btn mt-8 bg-amber-400 px-6 py-3 text-base text-[#0f1f4b] hover:bg-amber-300">
              Commencer <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid content-center gap-3">
            {AVANTAGES.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-[#0f1f4b]"><Check className="h-4 w-4" /></span>
                <span className="font-semibold">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Accès directs */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Accès directs responsables</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {ACCES_DIRECTS.map((a) => (
            <Link key={a.titre} to={a.lien} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f1f4b] ring-1 ring-slate-200 transition hover:ring-[#0f1f4b]">
              <a.icone className="h-4 w-4" /> {a.titre}
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-200 px-4 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {SITE.sousTitre} · {SITE.nomApplication}
      </footer>
    </div>
  );
}
