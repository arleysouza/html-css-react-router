import React, { useState, useEffect } from "react";
import api from "../api";
import "./Gasto.css";

const Gasto = () => {
	const [idgasto, setIdgasto] = useState("");
	const [descricao, setDescricao] = useState("");
	const [valor, setValor] = useState("");
	const [gastos, setGastos] = useState([]);

	//chamado ao montar o componente
	useEffect(() => {
		(async () => {
			list();
		})();
	}, []);

	const list = () => {
		api
			.get("/api/gasto/list")
			.then(({ data }) => {
				setGastos(data.gastos);
			})
			.catch((e) => alert(e.response.data.error[0]));
	};

	const save = (e) => {
		e.preventDefault();
		if (idgasto) {
			api
				.put("/api/gasto/update", { idgasto, descricao, valor })
				.then(() => {
					handle({ idgasto: "", descricao: "", valor: "" });
					list();
				})
				.catch((e) => {
					alert(e.response.data.error[0]);
				});
		} else {
			api
				.post("/api/gasto/create", { descricao, valor })
				.then(() => {
					handle({ idgasto: "", descricao: "", valor: "" });
					list();
				})
				.catch((e) => {
					alert(e.response.data.error[0]);
				});
		}
	};

	const remove = (e) => {
		e.preventDefault();
		if (idgasto) {
			api
				.delete("/api/gasto/remove", { data: { idgasto } })
				.then(() => {
					handle({ idgasto: "", descricao: "", valor: "" });
					list();
				})
				.catch((e) => {
					alert(e.response.data.error[0]);
				});
		}
	};

	const handle = (obj) => {
		setIdgasto(obj.idgasto);
		setDescricao(obj.descricao);
		setValor(obj.valor);
	};

	return (
		<div className="gasto">
			<h4>Gasto</h4>
			<form>
				<div className="linha">
					<label>ID</label>
					<input value={idgasto} disabled />
				</div>
				<div className="linha">
					<label htmlFor="descricao">Descrição</label>
					<input
						value={descricao}
						onChange={(e) => setDescricao(e.target.value)}
						id="descricao"
					/>
				</div>
				<div className="linha">
					<label htmlFor="valor">Valor</label>
					<input
						value={valor}
						onChange={(e) => setValor(e.target.value)}
						id="valor"
					/>
				</div>
				<div className="linha-botao">
					<button onClick={save}>Salvar</button>
					{idgasto && (
						<>
							<button onClick={remove}>Excluir</button>
							<button
								onClick={() =>
									handle({ idgasto: "", descricao: "", valor: "" })
								}
							>
								Limpar
							</button>
						</>
					)}
				</div>
			</form>
			{gastos.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Descrição</th>
							<th>Valor</th>
						</tr>
					</thead>
					<tbody>
						{gastos.map((item) => (
							<tr key={item.idgasto} onClick={() => handle(item)}>
								<td>{item.idgasto}</td>
								<td>{item.descricao}</td>
								<td>{item.valor}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Gasto;
