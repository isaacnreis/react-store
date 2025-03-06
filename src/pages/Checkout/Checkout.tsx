import { useForm } from "react-hook-form";
import { useCartStore } from "../../store/cartStore";
import styles from "./Checkout.module.scss";
import CheckoutButton from "../../components/CheckoutButton/CheckoutButton";

interface FormData {
  name: string;
  email: string;
  address: string;
  cardNumber: string;
}

const Checkout = () => {
  const { cart, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Pedido finalizado: ", data);
    alert("Compra realizada com sucesso");
    clearCart();
  };

  return (
    <div className={styles.container}>
      <h1>Finalizar Compra</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label>Nome Completo:</label>
          <input {...register("name", { required: "Nome é obrigatório" })} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}

          <label>Email:</label>
          <input
            {...register("email", {
              required: "Email é obrigatório",
              pattern: { value: /^\S+@\S+$/, message: "Email inválido" },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}

          <label>Endereço:</label>
          <input
            {...register("address", { required: "Endereço é obrigatório" })}
          />
          {errors.address && (
            <p className={styles.error}>{errors.address.message}</p>
          )}

          <label>Número do Cartão:</label>
          <input
            type="text"
            {...register("cardNumber", {
              required: "Número do cartão é obrigatório",
              pattern: {
                value: /^[0-9]{16}$/,
                message: "Número do cartão inválido (16 dígitos)",
              },
            })}
          />
          {errors.cardNumber && (
            <p className={styles.error}>{errors.cardNumber.message}</p>
          )}

          <button type="submit">Finalizar Compra</button>
          <CheckoutButton />
        </form>
      )}
    </div>
  );
};

export default Checkout;
