import React, {useEffect,useState} from 'react'
import apiInstance from '../../utils/axioxs'
import { useNavigate, Link } from 'react-router-dom'

function Products() {
    const [products, setProducts]=useState([])
    const [category, setCategory]=useState([])

    const [colorValue, setColorValue] = useState("No Color")
    const [sizeValue, setSizeValue] = useState("No Size")

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedColors, setSelectedColors] = useState({})
    const [selectedSize, setSelectedSize] = useState({})

    const [qtyValue, setQtyValue] = useState(1)




    const handleColorButtonClick = (event, product_id, colorName) => {
      setColorValue(colorName)
      setSelectedProduct(product_id)
      setSelectedColors((prevSelectedColors) => ({
        ...prevSelectedColors,
        [product_id]: colorName
      }))
    }

    const handleSizeButtonClick = (event, product_id, sizeName) => {
      setSizeValue(sizeName)
      setSelectedProduct(product_id)
      setSelectedSize((prevSelectedSize) => ({
        ...prevSelectedSize,
        [product_id]: sizeName
      }))
    }

      console.log(selectedSize)
      //console.log(selectedProduct)

    const handleQtyChange = (event, product_id) => {
        setQtyValue(event.target.value);
        setSelectedProduct(product_id);
    };  



    useEffect(() => {
        apiInstance.get(`product/`).then((response) => {
            setProducts(response.data)
        })

        
    }, [] )

    useEffect(() => {
      

      apiInstance.get(`category/`).then((response) => {
        setCategory(response.data)
      })
  }, [] )



  return (
  <> 
    <main className="mt-5">
    <div className="container">
      <section className="text-center">
        <div className="row">
            {products?.map((p, index) => (
          <div className="col-lg-4 col-md-12 mb-4" key={index}>
            <div className="card">
              <div
                className="bg-image hover-zoom ripple"
                data-mdb-ripple-color="light"
              >
                <img
                  src={p.image}
                  style={{width:"100%", height:"250px", objectFit:"cover"}}
                  className="w-100"
                />
                
              </div>
              <div className="card-body">
              <Link to={`/product-detail/${p.slug}`} className="text-reset">
                  <h5 className="card-title mb-3">{p.title}</h5>
              </Link>
                <a href="" className="text-reset">
                  <p>{p.category?.title}</p>
                </a>
                <div className='d-flex justify-content-center'>

                    <h6 className="mb-3">${p.price}</h6>
                    <h6 className="mb-3 text-muted ms-2">${p.old_price}</h6>
                </div>
                <div className="btn-group">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuClickable"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="false"
                    aria-expanded="false"
                  >
                    Variation
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuClickable"
                  >
                    {/* Quantity */}
                    <div className="d-flex flex-column mb-2 mt-2 p-1">
                      <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                          <>
                              <li>
                                  <input
                                      type="number"
                                      className='form-control'
                                      placeholder='Quantity'
                                      onChange={(e) => handleQtyChange(e, p.id)}
                                      min={1}
                                      defaultValue={1}
                                  />
                              </li>
                          </>
                      </div>
                  </div>

                  {/* Size */}
                    {p?.size?.length > 0 && 

                    <div className="d-flex flex-column">
                      <li className="p-1">
                        <b>Size</b>: {selectedSize[p.id] || 'Select a size'}
                      </li>
                      <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                        {p.size?.map((size, index) => (

                        
                          <li>
                            <button onClick={(e) => handleSizeButtonClick(e,p.id,size.name)} className="btn btn-secondary btn-sm me-2 mb-1">
                              {size.name}
                            </button>
                          </li>
                        ))}
                        
                      </div>
                    </div>
                    }

                    {p.color?.length > 0 && 
                    <div className="d-flex flex-column mt-3">
                      <li className="p-1">
                        <b>COlor</b>: {selectedColors[p.id] || 'Select a color'}
                      </li>
                      <div className="p-1 mt-0 pt-0 d-flex flex-wrap">
                        {p?.color?.map((color, index) => (
                        <li>
                          <button
                            className="btn btn-sm me-2 mb-1 p-3"
                            style={{ backgroundColor: `${color.color_code}` }}
                            onClick={(e) => handleColorButtonClick(e,p.id,color.name)}
                          />
                        </li>
                        ))}
                       
                      </div>
                    </div>
                    }
                    <div className="d-flex mt-3 p-1">
                      <button
                        type="button"
                        className="btn btn-primary me-1 mb-1"
                      >
                        <i className="fas fa-shopping-cart" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger px-3 me-1 mb-1 ms-2"
                      >
                        <i className="fas fa-heart" />
                      </button>
                    </div>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-danger px-3 me-1 ms-2"
                  >
                    <i className="fas fa-heart" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          ))}


        <div className='row'>
              {category?.map((c, index) => (
            <div className="col-lg-2">
              <img src={c.image} style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} alt="" />
              <h6>{c.title}</h6>
            </div>
            ))}
            
          </div>
          
          

        </div>
      </section>
      {/*Section: Wishlist*/}
    </div>
    </main>
  </>
    
  )
}

export default Products