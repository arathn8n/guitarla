import React from 'react'

const Guitar = ({guitar, addToCart}) => {

    const {id, name, image, description, price } = guitar


  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit quae labore odit magnam in autem nesciunt, amet deserunt</p>
                    <p className="fw-black text-primary fs-3">${price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        // llamamos la funcion y el parametro serán los valores de la desetructuracion de guitar
                        onClick={()=> addToCart(guitar)}
                    >Agregar al Carrito</button>
                </div>
            </div>
  )
}

export default Guitar