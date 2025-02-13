import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className="space-y-3 flex flex-col items-start font-beVietnam">
            <div className="text-left">
              <p className="text-lg font-medium mb-2">Contact us:</p>
              <a
                href="mailto:Letofy3@gmail.com"
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                Letofy3@gmail.com
              </a>
            </div>

            <div>
              <p className="text-lg font-medium mb-3">
                Follow us on instagram:
              </p>
            </div>
            <Link
              to="https://www.instagram.com/letofy8/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 mx-auto transition-opacity"
            >
              <div className="relative w-12 h-12">
                <img
                  src="/socialIcons/instagram.svg"
                  alt="Instagram"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
  )
}

export default Contact