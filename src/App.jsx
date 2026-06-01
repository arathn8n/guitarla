import { useEffect, useState } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/data"


function App() {

  function initialCart() {
    const localStorageCart = localStorage.getItem('cart')

    return localStorageCart ? JSON.parse(localStorageCart) : []
  }



  // su valor inicial será lo que tengamos en data.js
  const [data] = useState(db)
  // su valor inicial un arreglo vacio, lo iremos llenando. se puede poner [] en vez de initialCart ya que eso es de localStorage
  const [cart, setCart] = useState(initialCart)

  // aqui pasamos los valores de guitar y lo llamamos item
  function addToCart(item) {
    // detectar si un elemento existe en el carrito
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

    if (itemExist >= 0) {
      // si existe en el carrito haz esto
      // creamos una copia de cart y lo guardamos en la variable updateCart
      const updateCart = [...cart]
      // apunta al objeto del producto que ya estaba en el carrito
      updateCart[itemExist].quantity++
      // actualizas el estado cart con la nueva versión del arreglo (updateCart)
      setCart(updateCart)
    } else {
      // en el caso de que no exista haz esto
      // que se agregue una cantidad al pulsar
      item.quantity = 1
      // que la funcion setCart cree una copia de cart con su valor inicial y lo fucione con los valores de item
      setCart([...cart, item])
    }

  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // obtenemos el id del elemento a eliminar
  // setCart para modificar
  // cart.filter para filtrar los elementos diferentes al id cliqueado
  function removeFromCart(id) {
    setCart(cart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < 5) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }




  return (
    <>

      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}

      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((guitar) =>
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          )}

        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
