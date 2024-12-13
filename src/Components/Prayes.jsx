const Prayes = (props) => {
  return (
    <>
      <div className="prayer">
        <p className="name_prayer">{props.name}</p>
        <p className="time_prayer">{props.time}</p>
      </div>
    </>
  );
};

export default Prayes;
