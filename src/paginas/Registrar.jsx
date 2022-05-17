import {useState} from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [alerta, setAlerta] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if ([nombre, email, password, repetirPassword].includes('')) {
			setAlerta({msg: 'Todos los campos son obligatorios', error: true});
			return;
		}

		if (password !== repetirPassword) {
			setAlerta({msg: 'Los passwords no son iguales', error: true});
			return;
		}

		if (password.length < 6) {
			setAlerta({
				msg: 'El password es muy corto, agrega minimo 6 caracteres',
				error: true,
			});
			return;
		}

		setAlerta({});

		//Crear el usuario en la api
		try {
			await clienteAxios.post('/veterinarios', {nombre, email, password});

			setAlerta({
				msg: 'Usuario creado correctamente, revise su email para confirmar su cuenta.',
				error: false,
			});
		} catch (e) {
			setAlerta({msg: e.response.data.msg, error: true});
		}
	};

	const {msg} = alerta;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 text-6xl font-black">
					Crea tu Cuenta y Administra
					<span className="text-black"> tus Pacientes</span>
				</h1>
			</div>
			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{msg && <Alerta alerta={alerta} />}
				<form onSubmit={handleSubmit}>
					<div className="py-5">
						<label className="uppercase text-gray-600 block text-xl font-bold ">
							Nombre
						</label>
						<input
							className="border w-full p-3 mt-3 bg-gray-300 opacity-80 rounded-lg"
							type="text"
							placeholder="Tu Nombre"
							id="nombre"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
						/>
					</div>
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
					<div className="py-5">
						<label className="uppercase text-gray-600 block text-xl font-bold ">
							Repetir Password
						</label>
						<input
							className="border w-full p-3 mt-3 bg-gray-300 opacity-80 rounded-lg"
							type="password"
							placeholder="Repite tu Password"
							id="password"
							value={repetirPassword}
							onChange={(e) => setRepetirPassword(e.target.value)}
						/>
					</div>

					<input
						type="submit"
						value="Registrar"
						className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
					/>
				</form>

				<nav className="mt-10 lg:flex  lg:justify-between">
					<Link className="block text-center my-5 text-gray-500" to="/">
						¿Ya tienes una cuenta? Inicia Sesión
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

export default Registrar;
