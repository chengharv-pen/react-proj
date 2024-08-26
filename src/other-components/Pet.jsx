import { Link } from "react-router-dom";

// This is a functional component
const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images && images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img data-testid="thumbnail" src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} -- {breed} -- {location}
        </h2>
      </div>
    </Link>
  );
};

// This is equivalent to the other const Pet
//
// import { createElement } from "react";

// // const Pet = (props) => {
// //   return createElement("div", {}, [
// //     createElement("h1", {}, props.name),
// //     createElement("h2", {}, props.animal),
// //     createElement("h2", {}, props.breed),
// //   ]);
// // };

export default Pet;
