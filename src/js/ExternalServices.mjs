const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const response = await res.json();
  
  if (res.ok) {
    return response;
  } else {
    throw { name: 'servicesError', message: response };
  }
}

export default class ExternalServices {

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(form) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    const response = await fetch(`${baseURL}checkout/`, options);
    return convertToJson(response);
  }
}
