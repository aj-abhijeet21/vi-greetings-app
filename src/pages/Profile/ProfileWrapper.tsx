import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AvatarEditor from 'react-avatar-editor'
import {
  RiImageEditLine,
  RiHome4Line,
  RiShareForwardFill,
  RiDownloadLine,
  RiCameraLine,
} from 'react-icons/ri'
import { FiRotateCcw, FiRotateCw } from 'react-icons/fi'

function ProfileWrapper() {
  const [selectedFile, setSelectedFile] = useState('')
  const [captionText, setCaptionText] = useState('')
  const [rotation, setRotation] = useState(0)
  const [imageUrl, setImageUrl] = useState('')
  const [scale, setScale] = useState(1.2)
  const [isEditMode, setEditMode] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)
  const editor = useRef<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // generating link for the uploaded image
  const handleImageUpload = (e: any) => {
    setSelectedFile(URL.createObjectURL(e.target.files[0]))
  }

  // drawing on canvas and exporting canvas as an image to download
  const handleDownload = () => {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('height', '462')
    canvas.setAttribute('width', '300')
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const profileImg = new Image()
    profileImg.src = editor?.current?.getImageScaledToCanvas()
    const bgImg = new Image()
    bgImg.src = require('../../assets/images/frame.png')
    bgImg.onload = () => {
      ctx?.drawImage(editor.current.getImageScaledToCanvas(), 25, 100)
      ctx?.drawImage(bgImg, 0, 0, 300, 462)
      ctx!.font = '20px Arial'
      ctx!.textAlign = 'center'
      ctx!.fillStyle = 'white'
      setCaptionText((currentState) => {
        ctx?.fillText(currentState, 150, 450)
        return currentState
      })
    }
    setImageUrl(canvas.toDataURL('image/png'))

    window.setTimeout(() => {
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'greeting'
      document.body.appendChild(link)
      link.dispatchEvent(new MouseEvent('click'))
      link?.parentNode?.removeChild(link)
    }, 100)
  }

  // handle share option
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: captionText,
          text: 'Check out this greeting!',
          url: imageUrl,
        })
        .then(() => console.log('Shared successfully.'))
        .catch((error) => console.log('Error sharing:', error))
    } else {
      console.log('Web Share API not supported.')
    }
  }

  return (
    <div className='h-screen p-6'>
      <div className='text-2xl text-center font-semibold text-dark mb-2'>Edit Greeting</div>
      {selectedFile ? (
        <div className='bg-red-400 flex justify-center '>
          <AvatarEditor
            image={selectedFile}
            width={250}
            height={250}
            border={0}
            scale={scale}
            rotate={rotation}
            ref={editor}
            className='mt-[115px] absolute text-center -z-10'
          />
        </div>
      ) : (
        <div
          className='top-[26%] left-[27%] absolute flex justify-center items-center '
          onClick={() => inputRef.current?.click()}
        >
          <div className='bg-white w-[180px] h-[180px] rounded-full flex justify-center items-center -z-10'>
            <span className='text-dark flex items-center'>
              <RiCameraLine />
              <div className='text-dark ml-2'>Add Photo</div>
            </span>
          </div>
          <input
            ref={inputRef}
            type='file'
            className='mt-10 text-center bg-dark rounded-full'
            onChange={handleImageUpload}
            accept='image/png, image/jpeg'
            hidden
          />
        </div>
      )}

      <div className='text-center z-10'>
        <img src={require('../../assets/images/frame.png')} alt='frame' />
        <div className='text-center absolute left-[25%] -mt-10'>
          <input
            type='text'
            className='bg-primary text-white text-center border-0 focus:border-none placeholder:text-white'
            value={captionText}
            placeholder={'Edit Caption'}
            onChange={(e) => setCaptionText(e.currentTarget.value)}
          />
        </div>
      </div>
      <div className='text-center mt-4'>
        {/* navigate to home */}
        {selectedFile === '' && (
          <Link to='/registration'>
            <button className='bg-secondary text-lg text-dark px-8 py-2 rounded-full text-center'>
              <div className='text-lg'>
                <span className='flex items-center'>
                  <RiHome4Line />
                  <div className='text-lg ml-2'>Home</div>
                </span>
              </div>
            </button>
          </Link>
        )}

        {/* edit image */}
        {isEditMode && (
          <div className='flex justify-between items-center'>
            <div className='mr-4'>
              <div className='flex items-center'>
                <button
                  className='text-xl font-bold'
                  onClick={() => setScale((prev) => prev - 0.1)}
                >
                  -
                </button>
                <input
                  type='range'
                  className=' h-[2px] bg-dark accent-primary rounded-lg appearance-none cursor-pointer mx-2'
                  value={scale}
                  min={0.5}
                  max={5}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
                <button
                  className='text-xl font-bold'
                  onClick={() => setScale((prev) => prev + 0.1)}
                >
                  +
                </button>
              </div>
              <div className='block mb-2 text-sm font-medium text-gray-900 '>Zoom</div>
            </div>
            <div className='mr-4'>
              <div className='flex items-center'>
                <button onClick={() => setRotation((prev) => prev - 1)}>
                  <FiRotateCcw />
                </button>
                <input
                  type='range'
                  className=' h-[2px] bg-dark accent-primary rounded-lg appearance-none cursor-pointer mx-2'
                  value={rotation}
                  min={0}
                  max={360}
                  onChange={(e) => setRotation(Number(e.target.value))}
                />
                <button onClick={() => setRotation((prev) => prev + 1)}>
                  <FiRotateCw />
                </button>
              </div>
              <div className='block mb-2 text-sm font-medium text-gray-900 '>Rotate</div>
            </div>
          </div>
        )}

        {/* edit image button */}
        {selectedFile && !isEditMode && !isSubmitted && (
          <button
            className='bg-secondary text-lg text-dark px-8 py-2 rounded-full text-center'
            onClick={() => setEditMode(true)}
          >
            <span className='flex items-center'>
              <RiImageEditLine />
              <div className='text-lg ml-2'>Edit</div>
            </span>
          </button>
        )}

        {/* submit button */}
        {isEditMode && !isSubmitted && (
          <button
            className='bg-secondary text-lg text-dark px-8 py-2 rounded-full text-center'
            onClick={() => setSubmitted(true)}
          >
            <div className='text-lg ml-2'>Submit</div>
          </button>
        )}

        {/* after submit actions */}
        {isSubmitted && (
          <div className='flex justify-evenly'>
            <Link to='/registration'>
              <button className='bg-secondary text-lg text-dark px-3 py-2 rounded-full text-center'>
                <span className='flex items-center'>
                  <RiHome4Line />
                  <div className='text-lg ml-2'>Home</div>
                </span>
              </button>
            </Link>
            <button
              className='bg-secondary text-lg text-dark px-3 py-2 rounded-full text-center'
              onClick={handleDownload}
            >
              <span className='flex items-center'>
                <RiDownloadLine />
                <div className='text-lg ml-2'>Download</div>
              </span>
            </button>
            <button
              className='bg-secondary text-lg text-dark px-3 py-2 rounded-full text-center'
              onClick={handleShare}
            >
              <span className='flex items-center'>
                <RiShareForwardFill />
                <div className='text-lg ml-2'>Share</div>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileWrapper
