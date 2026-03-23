export default function CategoryHomeButton({
  title = "example-icon",
  icon = "📦",
}) {
  return (
    <div
      className="
        group
        flex flex-col items-center justify-center p-4
        bg-primary/10 border border-secondary
        rounded-lg cursor-pointer
        transition-shadow duration-200
        hover:shadow-[0_0_16px_rgba(255,95,207,0.6)]
      "
      style={styles.iconBox}
    >
      <div className="text-secondary-600 group-hover:text-secondary-400 transition-colors duration-200 text-5xl">
        {icon}
      </div>

      <p className="mt-2 text-lg font-semibold text-center text-secondary-600 group-hover:text-secondary-400">
        {title}
      </p>
    </div>
  );
}

const styles = {
  iconBox: {
    width: "100%",
    height: "200px",
    aspectRatio: "1 / 1",
    borderRadius: "8px",
  },
};
