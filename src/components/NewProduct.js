function NewProduct(props) {
        //Remover duplicidade da categoria
        const newCategoryArr = props.state.categories.filter(
            (el, index) => props.state.categories.indexOf(el) === index
          );
  return (
      <div className="col-6 mt-5">
        <form className="row g-3" onSubmit={props.handleSubmit}>
          <div className="col-10">
            <label htmlFor="productName" className="form-label">
              <strong>Product Name</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              name="title"
              onChange={props.handleChange}
              value={props.state.title}
              required
            />
          </div>
          <div className="col-10">
            <label htmlFor="productDescription" className="form-label">
              <strong>Description</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="productDescription"
              name="description"
              onChange={props.handleChange}
              value={props.state.description}
              required
            />
          </div>
          <div className="col-10">
            <label htmlFor="productImage" className="form-label">
              <strong>Image Url</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="productImage"
              placeholder="http://..."
              name="image"
              onChange={props.handleChange}
              value={props.state.image}
              required
            />
          </div>
          <div className="col-10">
            <label htmlFor="productCategory" className="form-label">
              <strong>Category</strong>
            </label>
            <select
              className="form-select"
              id="productCategory"
              name="category"
              onChange={props.handleChange}
              value={props.state.category}
              required
            >
              {newCategoryArr.map((obj) => (
                <option key={obj}>{obj}</option>
              ))}
            </select>
          </div>
          <div className="col-5">
            <label htmlFor="productPrice" className="form-label">
              <strong>Price</strong>
            </label>
            <div className="input-group">
              <span className="input-group-text" id="currency">
                $
              </span>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                placeholder="00.00"
                name="price"
                onChange={props.handleChange}
                value={props.state.price}
                required
              />
            </div>
          </div>
          <div className="col-5">
            <label htmlFor="productRating" className="form-label">
              <strong>Rating</strong>
            </label>
            <input
              type="number"
              className="form-control"
              id="productRating"
              placeholder="0 -> 5.0"
              name="rating"
              onChange={props.rating}
              step="0.1"
              min="0"
              max="5"
              required
            />
            <div>Please provide a rating 0 to 5.</div>
          </div>
          <div className="col-12">
            <button id="btnSubmit" className="btn btn-primary" type="submit">
              Submit new product
            </button>
          </div>
        </form>
      </div>
  );
}

export default NewProduct;
