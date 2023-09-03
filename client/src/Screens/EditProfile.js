import React, { useState } from 'react'
import "../Assets/css/EditProfile.css"
import Avatar from "react-avatar-edit"

const EditProfile = () => {
  const [dialog, setDialog] = useState(false);
  const [imgCrop, setImgCrop] = useState(false);
  const [storeImage, setStoreImage] = useState([]);

  const onCrop = (view) => {
    setImgCrop(view);
  }

  const onClose = () => {
    setImgCrop(null);
  }

  const saveImage = () => {
    setStoreImage([...storeImage, { imgCrop }]);
    setDialog(false);
  }

  const profileImageShow = storeImage.map(item => item.imgCrop);


  return (
    <>
      <div className="outerProfile">
        <h1>Edit Profile</h1>
        <div className='editAvatar'>
          <img className='avatar' src={profileImageShow.length ? profileImageShow : "https://www.hindubhagwan.com/Gallery/images/portfolio/full/lord_hanuman_angry_image.jpg"} alt="" />
          <i class="fa-solid fa-pen"  onClick={() => setDialog(true)}></i>
          {
            dialog ?
              <div className='dialog'>
                <div className='alignRight'><i class="fa-solid fa-xmark fa-xl" onClick={() => setDialog(false)}></i></div>
                  <Avatar
                    width={300}
                    height={250}
                    onClose={onClose}
                    onCrop={onCrop}

                  />
                <button onClick={saveImage}>Save</button>
              </div> : ""
          }
        </div>


        <div className='textUpdate'>
          <div className='alignRight'><i class="fa-solid fa-pen-to-square fa-xl"></i></div>
          <form>
            <div className='profileItem'>
              <span>Name</span>
              <input type="text" className='profileInput' />
            </div>
            <div className='profileItem'>
              <span>Gender</span>
              <input type="radio" value="Male" name="gender" className='radio' /> Male
              <input type="radio" value="Female" name="gender" className='radio' /> Female
              <input type="radio" value="Other" name="gender" className='radio' /> Other
            </div>
            <div className='profileItem'>
              <span>Email</span>
              <input type="email" className='profileInput' />
            </div>
            <div className='profileItem'>
              <span>Phone</span>
              <input type="tel" className='profileInput' />
            </div>
            <button>Update</button>
          </form>
        </div>

      </div>
    </>
  )
}

export default EditProfile
