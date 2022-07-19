import CategoryItem from '../catergory-item/category-item.component';
import './category.styles.scss';

const Category = ({ categories }) => {
  return (
    <div className="category-container">
      {
        categories.map(category => (
          <CategoryItem 
            category={ category }
            key={ category.id }
          />
        ))
      }
    </div>
  )
};

export default Category;