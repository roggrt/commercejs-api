import React, { Component } from 'react';
import Link from 'next/link';
import Cart from '../cart/Cart';
import commerce from '../../lib/commerce';
import Animation from '../cart/Animation';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux'
import { clearCustomer } from '../../store/actions/authenticateActions';

const duration = 300;

const defaultStyle = {
  zIndex: '-1',
  transition: `height ${duration}ms ease-in-out`,
  height: 0
};

const transitionStyles = {
  entering: { height: '100vh' },
  entered: { height: '100vh' },
  exiting: { height: 0 },
  exited: { height: 0 }
};

const mobileMenuLinks = [
  {
    name: 'Inicio',
    link: '/'
  },
  {
    name: 'Tienda',
    link: '/collection'
  },
  {
    name: 'Sobre nosotros',
    link: '/about'
  }
];

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMobileMenu: false,
      showCart: false,
      playAddToCartAnimation: false,
      loggedIn: false,
    };

    this.header = React.createRef();

    this.animate = this.animate.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.toggleAddToCartAnimation = this.toggleAddToCartAnimation.bind(this);
    this.handleAddToCartToggle = this.handleAddToCartToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('Commercejs.Cart.Item.Added', this.handleAddToCartToggle);

    this.setState({
      loggedIn: commerce.customer.isLoggedIn(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('Commercejs.Cart.Item.Added', this.handleAddToCartToggle);
  }

  toggleCart() {
    const { showCart } = this.state;
    this.setState({
      showCart: !showCart,
    });
  }

  handleScroll() {
    window.requestAnimationFrame(this.animate);
  }

  handleLogout() {
    this.props.clearCustomer();
    this.setState({
      loggedIn: false,
    });
  }

  animate() {
    const { transparent } = this.props;

    if (!transparent) {return;}

    if (window.scrollY > 10) {
      this.header.current.classList.add('invert');
    } else {
      this.header.current.classList.remove('invert');
    }
  }

  toggleMobileMenu() {
    const { showMobileMenu } = this.state;
    this.setState({ showMobileMenu: !showMobileMenu });

    if (!showMobileMenu) {
      this.header.current.classList.add('invert');
    } else {
      this.animate();
    }
  }

  /**
   * Animaciones para la tienda
   */
  toggleAddToCartAnimation() {
    const { playAddToCartAnimation } = this.state;

    this.setState({ playAddToCartAnimation: !playAddToCartAnimation });
  }

  /**
   * Llamar toggle la animacion y duracion de la animacion del carrito
   */
  handleAddToCartToggle() {
    this.toggleAddToCartAnimation();
    setTimeout(() => {
      this.toggleAddToCartAnimation();
    }, 3000)
  }
//metodos para revisar el inicio de sesion del cliente
  renderLoginLogout() {
    const { customer } = this.props;
    const { loggedIn } = this.state;

    if (loggedIn) {
      return (
        <div className="d-flex align-items-center">
          { customer && customer.firstname && (
            <span className="mr-2 font-weight-regular">
              Hola, { customer.firstname }!
            </span>
          ) }
          <Link href="/account">
            <a className="font-color-black mx-2">
              Mi cuenta
            </a>
          </Link>
          <button
            className="bg-transparent mr-2 font-color-black font-weight-semibold"
            type="button"
            onClick={this.handleLogout}
          >
            Cerrar Sesion
          </button>
        </div>
      );
    }

    return (
      <Link href="/login">
        <a className="font-color-black login">
          Iniciar Sesion
        </a>
      </Link>
    );
  }

  render() {
    const { showMobileMenu, showCart } = this.state;
    const { transparent, cart } = this.props;

    return (
      <header className="position-fixed top-0 left-0 right-0 font-weight-semibold no-print">
        <Cart isOpen={showCart} toggle={value => this.toggleCart(value)} />
        <div
          ref={this.header}
          className={`d-flex header align-items-center justify-content-between position-relative ${
            transparent ? '' : 'invert'
          }`}
        >
          <div className="d-none d-sm-flex">
            <Link href="/collection">
              <a className="mr-4 font-color-black">Tienda</a>
            </Link>
            <Link href="/about">
              <a className="font-color-black">Acerca de</a>
            </Link>
          </div>
          <div className="logo-container">
            <img
              src={`/icon/${showMobileMenu ? 'cross' : 'menu'}.svg`}
              onClick={this.toggleMobileMenu}
              className="w-32 mr-1 d-block d-sm-none"
              alt="Menu icon"
            />
            <Link href="/">
              <a>
                <img
                  src="https://cdn-icons.flaticon.com/png/512/2954/premium/2954820.png?token=exp=1634890998~hmac=0ec784c6c3cca9b0e4185ee66900caaa"
                  className="logo cursor-pointer"
                  alt="Logo"
                />
              </a>
            </Link>
          </div>
          <div className="d-flex">
            { process.browser && this.renderLoginLogout() }
            <div
              className="position-relative cursor-pointer"
              onClick={this.toggleCart}
            >
              <Animation isStopped={ this.state.playAddToCartAnimation } />
              <div className="cart-count position-absolute font-size-tiny font-weight-bold">
                {cart.total_items}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <Transition in={showMobileMenu} timeout={duration}>
          {state => (
            <div
              className="d-sm-none position-fixed left-0 right-0 overflow-hidden"
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
                // Prevent gap being shown at bottom of mobile menu
                top: '1em'
              }}
            >
              <div
                className="position-absolute left-0 right-0 h-100vh mobile-menu-inner bg-black700 d-flex flex-column justify-content-center"
                style={{
                  // Prevent mobile menu items (e.g. Home) being hidden behind navbar on small screen heights (e.g. iPhone4 landscape of 320px height)
                  top: '4em'
                }}
              >
                {mobileMenuLinks.map((item, i) => (
                  <Link key={i} href={item.link}>
                    <a className="d-block mb-4 font-size-heading font-color-white text-center">
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Transition>
      </header>
    );
  }
}

export default connect(
  state => state,
  { clearCustomer },
)(Header);
