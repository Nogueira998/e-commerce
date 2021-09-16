import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "../css/ManagerProducts.css";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";

let isMounted = false;

class ManagerProducts extends React.Component {
  state = {
    products: [],
    categories: [],
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {},
    edit: false,
  };

  componentDidMount = async () => {
    isMounted = true;
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/caiofilipeSuperstore"
      );
      this.setState({ products: [...response.data] });
    } catch (err) {
      console.error(err);
    }
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/caiofilipesuperstorecategories"
      );
      this.setState({ categories: [...response.data[0].categories] });
    } catch (err) {
      console.error(err);
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevState !== this.state) {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/caiofilipeSuperstore"
        );
        if (isMounted) {
          this.setState({ products: [...response.data] });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  componentWillUnmount = () => {
    isMounted = false;
  };

  handleChange = (event) => {
    return this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.edit) {
      this.setState({ edit: false });
    }
    let stateClone = {
      _id: this.state._id,
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
      rating: this.state.rating,
    };

    axios
      .post("https://ironrest.herokuapp.com/caiofilipeSuperstore", stateClone)
      .then((response) => {
        console.log(response);
        this.setState({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
          rating: {},
          edit: false,
        });
      })
      .catch((err) => console.error(err));
  };

  editSubmit = (event) => {
    event.preventDefault();
    let stateClone = {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      image: this.state.image,
      rating: this.state.rating,
    };

    axios
      .put(
        `https://ironrest.herokuapp.com/caiofilipeSuperstore/${this.state._id}`,
        stateClone
      )
      .then((response) => {
        console.log(response);
        this.setState({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
          edit: false,
        });
      })
      .catch((err) => console.error(err));
  };

  rating = (event) => {
    this.setState((prevState) => ({
      rating: {
        ...prevState.rating,
        rate: event.target.value,
      },
    }));
  };

  removeClick = (event) => {
    try {
      const response = axios.delete(
        `https://ironrest.herokuapp.com/caiofilipeSuperstore/${event.target.value}`
      );
      this.setState({ products: [...response.data] });
    } catch (err) {
      console.error(err);
    }
  };

  editClick = (event) => {
    const found = this.state.products.find(
      (element) => element._id === event.target.value
    );
    return this.setState({ ...found, edit: true });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.edit ? (
            <EditProduct
              state={this.state}
              handleSubmit={this.editSubmit}
              handleChange={this.handleChange}
              rating={this.rating}
            />
          ) : (
            <NewProduct
              state={this.state}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              rating={this.rating}
            />
          )}

          {/* Lista de produtos */}
          <div className="col-6 mt-3">
            <h2>Product List</h2>
            <div
              className="list-group bg-white"
              style={{ maxHeight: "85vh", overflow: "scroll" }}
            >
              {this.state.products.map((productObj) => {
                return (
                  <div key={productObj._id} className="listProduct">
                    <img src={productObj.image} alt="imagem do produto" />
                    <div>
                      <p className="checkoutProduct__title">
                        {productObj.title}
                      </p>
                      <p>
                        <small>
                          $ <strong>{productObj.price}</strong>
                        </small>
                        <small>
                          Rating: <strong>{productObj.rating.rate}</strong>
                        </small>
                        <button
                          className="btn btn-danger"
                          onClick={this.removeClick}
                          value={productObj._id}
                        >
                          Remove
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={this.editClick}
                          value={productObj._id}
                        >
                          Edit
                        </button>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerProducts;
