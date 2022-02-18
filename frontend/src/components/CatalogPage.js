import React from 'react';
import Catalog from './Catalog';
import Search from './Search';

function CatalogPage() {
    return (
        <section className='container catalog'>
            <h2 className='text-center'>Каталог</h2>
            <Search />
            <Catalog />
        </section>
      
    );
}
export default CatalogPage;