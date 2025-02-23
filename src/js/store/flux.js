const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			formData: [],
			currentEdit: [],
			contact: []
		},
		actions: {
			getContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/jonathan1")
					
					if (!response.ok) {
						throw new Error("Salio mal el contacto");
					} 
					    const data = await response.json();
						const store = getStore();
						setStore({ ...store, contacts: data.contacts })
					    console.log(data)

				} catch (error) {
					console.log("Algo Salio Mal!!", (error))
				}
			},
			addContact: async (data) => {
				const actions = getActions();
				try {


					const response = await fetch("https://playground.4geeks.com/contact/agendas/jonathan1/contacts", {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						}


					})
					const responseData = await response.json();
					console.log("Respuesta al servidor", responseData)
					// console.log("Respuesta", response)
					if (response.ok) {
						console.log("contacto agregado")
						actions.getContacts();
					}
					else {
						console.error("❌ Error en la respuesta del servidor:", responseData);
						alert("Error al agregar contacto: " + JSON.stringify(responseData)); // Muestra el error en pantalla
					}
				} catch (error) {
					console.log("Aqui esta el Error!!!", error)

				}
			},
			editContact: async (body, id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/Jonathan/contacts/${id}`, {
						method: "PUT",
						body: JSON.stringify(body),
						headers: {
							"Content-Type": "application/json"
						}
					})
					if (!response.ok) {
						throw new Error("Salio mal el Edit!!!!");
					}
					const data = await response.json();
					console.log(data);
					const actions = getActions();
					await actions.getContacts();



				} catch (error) {
					console.error(error)
				}
			},
			setCurrentEdit: (obj) => {
				let store = getStore();
				setStore({ ...store, currentEdit: obj })
			},

			deleteContact: async (idContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/Jonathan/contacts/${idContact}`, {
						method: "DELETE",
					})
					if (!response.ok) {
						throw new Error("No se puede eliminar");
					}
					const data = await response.json();
					console.log("El contacto se Elimino", data);
					const actions = getActions();
					await actions.getContacts();


				} catch (error) {
					console.log(error)
				}


			}


		}
	};
};

export default getState;
