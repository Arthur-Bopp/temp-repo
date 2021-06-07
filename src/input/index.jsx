import './styles.css';

export const TextInput = ({handleChange, searchValue}) => {
  
    return(
      <input 
          className = "text-imput"
          onChange={handleChange}
          value={searchValue}
          type="search"
          placeholder="Type Your Search"
        />
    )
  }
