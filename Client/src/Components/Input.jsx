const Input = ({
    id,
    name,
    type,
    value,
    onChangeHandler,
    children
}) => {
    return (
        <div className='relative'>
            <input
                type={type}
                id={id}
                name={name}
                className={`inputs peer mt-4 h-16 rounded-lg`}
                autoComplete='off'
                placeholder=' '
                size={50}
                onChange={onChangeHandler}
                value={value}
                required
            />
            <label htmlFor={id} className='labels'>
                {children}
            </label>
        </div>
    );
};

export default Input