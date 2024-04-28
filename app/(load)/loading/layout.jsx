export default function RootLayout({ children }) {
  return (
    <div lang="en">
      <div className="flex justify-center items-center my-20">
        <p>Heyyy</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
