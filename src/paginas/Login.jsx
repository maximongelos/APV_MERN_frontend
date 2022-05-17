import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const {setAuth} = useAuth();

	const navigate = useNavigate();

	const {msg} = alerta;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([email, password].includes('')) {
			setAlerta({msg: 'Todos los campos son obligatorios', error: true});
			return;
		}

		try {
			const {data} = await clienteAxios.post('/veterinarios/login', {
				email,
				password,
			});

			localStorage.setItem('token', data.token);

			setAuth(data);

			navigate('/admin');
		} catch (e) {
			setAlerta({msg: e.response.data.msg, error: true});
		}
	};

	return (
		<>
			<div>
				<h1 className="text-indigo-600 text-6xl font-black">
					Inicia Sesión y Administra tus
					<span className="text-black"> Pacientes</span>
				</h1>
			</div>

			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{msg && <Alerta alerta={alerta} />}
				<form onSubmit={handleSubmit}>
					<div className="py-5">
						<label className="uppercase text-gray-600 block text-xl font-bold ">
							Email
						</label>
						<input
							className="border w-full p-3 mt-3 bg-gray-300 opacity-80 rounded-lg"
							type="email"
							placeholder="Email de Registro"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="py-5">
						<label className="uppercase text-gray-600 block text-xl font-bold ">
							Password
						</label>
						<input
							className="border w-full p-3 mt-3 bg-gray-300 opacity-80 rounded-lg"
							type="password"
							placeholder="Tu Password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<input
						type="submit"
						value="Iniciar Sesión"
						className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
					/>
				</form>

				<nav className="mt-10 lg:flex  lg:justify-between">
					<Link
						className="block text-center my-5 text-gray-500"
						to="/registrar"
					>
						¿No tienes una cuenta? Registrate
					</Link>
					<Link
						className="block text-center my-5 text-gray-500"
						to="/olvide-password"
					>
						Olvide mi password
					</Link>
				</nav>
			</div>
		</>
	);
};

export default Login;
