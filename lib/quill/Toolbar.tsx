const Toolbar = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select
          className="ql-header"
          defaultValue={''}
          onChange={(e) => e.persist()}
        >
          <option selected />
          <option value="1" />
          <option value="2" />
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="unordered"></button>
      </span>
      <span className="ql-formats">
        <select className="ql-color"></select>
        <select className="ql-background"></select>
      </span>
      <button className="ql-bv">bv</button>
      <button className="ql-bs">bs</button>

      <button className="ql-iv">iv</button>
      <button className="ql-is">is</button>
    </div>
  )
}

export default Toolbar
