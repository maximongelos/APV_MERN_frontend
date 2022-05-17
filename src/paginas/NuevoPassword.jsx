import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
	const [password, setPassword] = useState('');
	const [alerta, setAlerta] = useState({});
	const [tokenValido, setTokenValido] = useState(false);
	const [passwordModificado, setPasswordModificado] = useState(false);

	const params = useParams();
	const {token} = params;

	//Esto se ejecuta apenas carga el componente para verificar el token de uso unico
	useEffect(() => {
		const comprobarToken = async () => {
			try {
				await clienteAxios(`/veterinarios/olvide-password/${token}`);

				setAlerta({msg: 'Coloca tu Nuevo Password'});
				setTokenValido(true);
			} catch (e) {
				setAlerta({msg: 'Hubo un error con el enlace', error: true});
			}
		};

		comprobarToken();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password.length < 6) {
			setAlerta({
				msg: 'El password debe contener minimo 6 caracteres',
				error: true,
			});
			return;
		}

		try {
			const url = `/veterinarios/olvide-password/${token}`;
			const {data} = await clienteAxios.post(url, {
				password,
			});

			setAlerta({msg: data.msg});

			setPasswordModificado(true);
		} catch (e) {
			setAlerta({msg: e.response.data.msg, error: true});
		}
	};

	const {msg} = alerta;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 text-6xl font-black">
					Reestablece tu password y no pierdas acceso a
					<span className="text-black"> tus Pacientes</span>
				</h1>
			</div>
			<div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
				{msg && <Alerta alerta={alerta} />}
				{tokenValido && (
					<>
						<form onSubmit={handleSubmit}>
							<div className="py-5">
								<label className="uppercase text-gray-600 block text-xl font-bold ">
									Nuevo Password
								</label>
								<input
									className="border w-full p-3 mt-3 bg-gray-300 opacity-80 rounded-lg"
									type="password"
									placeholder="Tu nuevo Password"
									id="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<input
								type="submit"
								value="Guardar Nuevo Password"
								className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
							/>
						</form>

						{passwordModificado && (
							<Link className="block text-center my-5 text-gray-500" to="/">
								Iniciar Sesión
							</Link>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default NuevoPassword;
