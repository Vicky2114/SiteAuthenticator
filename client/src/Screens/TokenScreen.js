import React, { useEffect, useState } from "react";
import "../Assets/css/TokenScreen.css";
import "animate.css";
import { useLocation, useNavigate } from "react-router-dom";
import token from "../Assets/images/token.webp";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { TimePicker } from "react-ios-time-picker";
import Loading from "../Components/Loading";

const TokenScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState();
  const [isBlocked, setIsBlocked] = useState(false);
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [loading, setLoading] = useState(false);

  // const [copied, setCopied] = useState(false);

  useEffect(() => {

    const token = async () => {
 
      await axios
        .get("http://localhost:8000/users/token", {
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res);
          setData(res.data.website);
        });
    };

    token();
  }, []);

  const onChange1 = (timeValue) => {
    setValue1(timeValue);
  };
  const onChange2 = (timeValue) => {
    setValue2(timeValue);
  };

  const block = async (id) => {
try {
  
  const res = await axios.post(
    `http://localhost:8000/users/block/${id}/${value1}/${value2}`,
    {
      id: id,
    },
    {
      withCredentials: true,
    }
  );
  
  console.log(res.data);

} catch (error) {
  console.log(error)
}
  }

  const unblock = async (id) => {
    try {
      await axios.post(
        `http://localhost:8000/users/unblock/${id}`,
        {
          id: id,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const removeid = async (id) => {
    try {
      setLoading(true)
      await axios.post(
        `http://localhost:8000/users/removeid/${id}`,
        {
          id: id,
          data: "hello",
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("error");
    }
    setLoading(false)
    window.location.href = "/users/token";
  };

  /*const addweb=async (e)=>{
        e.preventDefault();
        const data=location.state.data;
        console.log(data)
        try {
            await axios.post("http://localhost:8000/users/token",{
              inputData,
              data
            })
             
        } catch (error) {
            console.log(error); 
        }
    }*/
  // console.log(data);

  const addItem = (e) => {
    e.preventDefault();
    if (!inputData) {
      alert("Please enter a valid url");
    } else if (inputData && !toggleSubmit) {
      setItems(
        data.map((elem) => {
          /* if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;*/
          console.log(elem);
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem();
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(id);
  };

  const copyToClipboard = (id) => {
    let elemClicked = data.find((elem) => {
      return elem.id === id;
    });

    // setCopied(true);

    navigator.clipboard.writeText(elemClicked.id);
    // setTimeout(() => {
    //     setCopied(false);
    // }, 1000);
  };

  const blockSiteHandler = async (id, status) => {
    setLoading(true)
    if (status) {
      await unblock(id);
      
      setLoading(false)
      window.location.href = "/users/token";
    } else {
      await block(id);
      setLoading(false)
      window.location.href = "/users/token";
    }
  };


  return <>
  {
    loading ? (
      <Loading />
    ) : (
      <>
        <div className="tokenContainer animate__animated animate__bounce">
          <div className="token-main-div">
            <div className="token-child-div">
              <h1>Add websites to be blocked</h1>
              <div className="addItems">
                <form
                  method="post"
                  action="http://localhost:8000/users/token"
                  className="tokenForm"
                >
                  <input
                    type="text"
                    placeholder="✍Enter URL of website..."
                    name="site"
                    value={inputData}
                    onChange={(event) => {
                      setInputData(event.target.value);
                    }}
                  />
                  {toggleSubmit ? (
                    <button
                      className="add-btn generate-token-btn"
                      title="Generate Token"
                    >
                      Generate Token
                    </button>
                  ) : (
                    <i
                      className="far fa-edit add-btn"
                      title="Update URL"
                      onClick={addItem}
                    ></i>
                  )}
                </form>
              </div>
              <div className="showItems">
                <h1>
                  {data.map((elem) => {
                    return (
                      <div className="eachItem" key={elem.id}>
                        <div
                          className={`url ${elem.status ? "blockedSite" : ""}`}
                        >
                          <div className="delweb">
                            <i
                              className="far fa-trash-alt add-btn"
                              title="Remove URL"
                              onClick={() => removeid(elem.id)}
                            ></i>
                            <h3>{elem.site}</h3>
                          </div>
                          <div className="utils">
                            <h5>From</h5>
                            <TimePicker onChange={onChange1} value={value1} />
                            <h5>To</h5>
                            <TimePicker onChange={onChange2} value={value2} />

                            <button
                              className={elem.status ? "unblock" : "block"}
                              onClick={() =>
                                blockSiteHandler(elem.id, elem.status)
                              }
                            >
                              {elem.status ? "Unblock" : "Block"}
                            </button>
                          </div>
                        </div>
                        <div className="token">
                          <h6>{elem.id}</h6>
                          {
                            <i
                              className="fa-solid fa-copy copy"
                              onClick={() => copyToClipboard(elem.id)}
                              title="copy token"
                              id={elem.id}
                            ></i>
                          }
                        </div>
                      </div>
                    );
                  })}
                </h1>

                {/* {
                  items.map((elem) => {
                      return (
                          <div className='eachItem' key={elem.id}>
                              <h3>{elem.name}</h3>
                              <div className="token-btn">
                                  <i className="far fa-edit add-btn" title="Edit URL" onClick={() => editItem(elem.id)}></i>
                                  <i className="far fa-trash-alt add-btn" title="Remove URL" onClick={() => deleteItem(elem.id)}></i>
                              </div>
                          </div>
                      )
                  })
              } */}
              </div>
              <div className="showItems">
                <button
                  className="tokenbtn effect04"
                  data-sm-link-text="Remove All"
                  onClick={removeAll}
                >
                  <span> CHECK LIST </span>{" "}
                </button>
              </div>
            </div>
          </div>
          {/* <img src={token} alt="" /> */}
        </div>
      </>
    )
  }
  </>
};

export default TokenScreen;
