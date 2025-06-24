import { CartCard } from "./CartCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useGlobalContext } from "./Context/GlobalContext";
import DeleteCartContents from "./Context/DeleteCartContents";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";

const Cart = ({ onClose }) => {
  const { setCart } = useGlobalContext();
  const {
    cartItems,
    setCartItems,
    deleteCartItem,
    setDeleteCartItems,
    deleteCartItems,
  } = useGlobalContext();
  const getCartTotal = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const subTotal = getCartTotal(cartItems);
  const deliveryFee = 4000;
  const total = subTotal + deliveryFee;
  const handleDeleteCartContents = () => {
    setCartItems([]);
    setDeleteCartItems(false);
    setCart(null);
  };
  return (
    <div className="w-full h-screen ">
      <div className="flex justify-between items-center pt-6 px-5">
        <Link to={"/"}>
          <div
            className="flex cursor-pointer justify-center items-center text-xl"
            onClick={onClose}
          >
            <FaArrowLeftLong className="text-2xl pr-1" />
            <h3>Back</h3>
          </div>
        </Link>
        <h2
          className={`text-3xl font-bold text-blue ${
            cartItems.length < 1 && "mr-[7.2rem]"
          }`}
        >
          My Cart
        </h2>
        {cartItems.length >= 1 && (
          <div
            className="hover:cursor-pointer"
            onClick={() => setDeleteCartItems(true)}
          >
            <RiDeleteBin6Line className="text-3xl" />
          </div>
        )}
      </div>
      <div className="px-5 h-[50%] overflow-auto">
        {cartItems.map((item) => {
          return (
            <CartCard
              img={item.img}
              title={item.title}
              quantity={item.quantity}
              desc={item.desc}
              onRemove={deleteCartItem}
              id={item.id}
              price={item.price}
            />
          );
        })}
        {cartItems.length < 1 && (
          <div className=" mt-[4rem] text-xl text-blue flex justify-center items-center flex-col">
            <div className="text-center">
              <h2 className="font-bold text-blue">Your cart is empty!</h2>
              <p>Browse our menu and discover our tasty foods!</p>
            </div>
            <BsCartX size={130} className="text-gray-400 mt-16" />
            <Link to={"/menus"}>
              <button className="mt-10 bg-blue rounded-xl text-white active:bg-green-900  focus:bg-green-900 text-xl font-bold w-[12rem] h-[3rem]">
                Browse Menu
              </button>
            </Link>
          </div>
        )}
      </div>

      {cartItems.length >= 1 && (
        <div className="absolute bottom-0 left-0 w-full z-50 bg-white">
          <div className="mt-auto px-5">
            <div className="flex justify-between text-xl mb-3">
              <p>Sub Total:</p>
              <span className="font-semibold">
                {" "}
                &#8358;{subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xl pb-3  mb-12 border-b-2 border-gray-700">
              <p>Estimated Delivery Fee :</p>
              <span className="font-semibold"> &#8358;{deliveryFee}</span>
            </div>
          </div>
          <div className="flex gap-8 bg-blue h-[7rem] rounded-t-3xl text-white justify-center items-center">
            <div>
              <p>
                Total: ({cartItems.length} item{cartItems.length > 1 ? "s" : ""}
                )
              </p>
              <span className="font-bold text-2xl">
                &#8358;{total.toFixed(2)}
              </span>
            </div>
            <button className="bg-white text-blue rounded-2xl text-xl font-bold w-fit h-fit py-2 px-8">
              Submit Order
            </button>
          </div>
        </div>
      )}
      {deleteCartItems && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <DeleteCartContents
            onClose={() => setDeleteCartItems(false)}
            onConfirm={handleDeleteCartContents}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default Cart;
