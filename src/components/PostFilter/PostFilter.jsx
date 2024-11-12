
import React from 'react';
import Input from "../Ui/Input/Input";
import Select from "../Ui/Select/Select";

const PostFilter = ({filter, setFilter}) => {
  return (
    <div className="postfilter">
      <Input value={filter.query} label={'Search...'} onChange={(e) => setFilter({...filter, query: e.target.value})}/>
      <hr style={{margin: '15px 0', border: '1px solid grey'}}/>
      <Select value={filter.sort} onChange={selectedSort => setFilter({...filter,sort:selectedSort})} defaultValue='Sorting' defaultValue='Sorting' options={[
        {value:'title',name:'sorting by name'},
        {value:'text',name:'sorting by description'}
      ]}/>
      <hr style={{margin: '15px 0'}}/>
    </div>
  );
};

export default PostFilter;
  