const FooterComponent = () => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <div className="text-light bg-dark p-2 w-100">
        <div className="row">
          <div className="col-12 text-center">
            <a href="https://www.facebook.com/groups/148457915215098/" target="_blank" rel="noreferrer">
              <i
                className="fa-brands fa-facebook-f m-3"
                style={{ fontSize: "35px" }}
                title="Facebook"
              ></i>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=00972508248623"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-whatsapp m-3" title="WhatsApp"></i>
            </a>
            <a
              href="https://www.instagram.com/ponyfony_flowers/?hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-instagram m-3" title="Instagram"></i>
            </a>
            <a href="https://twitter.com/TheFlowerWorld?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-twitter m-3" title="Twitter"></i>
            </a>
            <a href="https://t.me/00972508248623" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-telegram m-3" title="Telegram"></i>
            </a>
            <a href="mailto:litalrozenberg10@gmail.com" target="_blank" rel="noreferrer">
              <i className="fa-regular fa-envelope m-3" title="Email"></i>
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            © Lital Rozenberg {getYear()} - all right reserved
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterComponent;
