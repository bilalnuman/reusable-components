import { useNavigate } from "react-router-dom"
import { useProductStore } from "../../stores";

const Create = () => {
    const navigate = useNavigate()
    const { addProduct } = useProductStore()
    const addItem = () => {
        addProduct({
            id: 999,
            model_name: 'Explorer',
            buying_price: '7900.00',
            image: 'https://example.com/explorer.jpg',
            condition: 'new',
            year: 2024,
        });
        setTimeout(() => {
            navigate("/products")
        }, 2000)
    }
    return (
        <button onClick={addItem}>Create</button>
    )
}

export default Create