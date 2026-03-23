import { FiSearch } from "react-icons/fi";

export default function MainSearchTextField() {
  return (
    <div style={styles.searchBox}>
      <FiSearch style={styles.icon} />
      <input type="text" placeholder="Buscar..." style={styles.input} />
    </div>
  );
}

const styles = {
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 10px",
  },
  icon: {
    fontSize: "18px",
    color: "#666",
  },
  input: {
    border: "none",
    outline: "none",
    boxShadow: "none",
    width: "100%",
  },
};
