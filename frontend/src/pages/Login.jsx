import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { SITE } from '../config/site';
import { ErrorMsg, Field } from '../components/ui';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate(location.state?.from || '/tableau-de-bord', { replace: true });
    } catch (err) {
      setErreur(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl bg-white p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
        <div className="text-center">
          <img src={SITE.logo} alt="" className="mx-auto h-20 w-20" />
          <h1 className="mt-3 font-display text-3xl font-semibold text-marine">{SITE.nom}</h1>
          <p className="text-sm text-slate-500">Connexion à {SITE.nomApplication}</p>
        </div>
        <ErrorMsg error={erreur} />
        <Field label="Identifiant"><input className="input" autoFocus required value={username} onChange={(e) => setUsername(e.target.value)} /></Field>
        <Field label="Mot de passe"><input type="password" className="input" required value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
        <button className="btn-primary w-full">Se connecter</button>
        {SITE.afficherComptesDemo && (
          <p className="rounded-lg bg-indigo-50 p-3 text-center text-xs text-indigo-800">
            Démo : <b>admin</b> / <b>admin123</b> · <b>pasteur</b> / <b>pasteur123</b> · <b>accueil</b> / <b>accueil123</b>
          </p>
        )}
        <p className="text-center text-sm"><Link to="/" className="text-indigo-600 hover:underline">← Retour à l'accueil</Link></p>
      </form>
    </div>
  );
}
