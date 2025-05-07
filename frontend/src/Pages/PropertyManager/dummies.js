import house111 from '/PropertyImages/111-house.jpeg';
import house112 from '/PropertyImages/112-house.jpeg';
import house113 from '/PropertyImages/113-house.jpeg';
import house114 from '/PropertyImages/114-house.jpeg';

import room121 from '/PropertyImages/121-room.jpeg';
import house121 from '/PropertyImages/121-house.jpeg';
import house122 from '/PropertyImages/122-house.jpg';
import house123 from '/PropertyImages/123-house.jpeg';
import house124 from '/PropertyImages/124-house.jpeg';
import house125 from '/PropertyImages/125-house.jpg';

import room122 from '/PropertyImages/122-room.jpeg';
import room123 from '/PropertyImages/123-room.jpeg';
import room221 from '/PropertyImages/221-room.avif';
import room222 from '/PropertyImages/222-room.jpeg';
import room223 from '/PropertyImages/223-room.jpeg';

export const DUMMY_PROPERTIES = [
  {
    id_home: 1,
    home_owner: 1,
    home_name: 'Casa Chapultepec',
    home_on_sale: 1,
    home_all_in: 0,
    home_description: 'Casa amplia en zona céntrica, ideal para estudiantes.',
    address: 'Calle Falsa 123, Ciudad de México',
    home_ubication: [20.6736, -103.3440],
    tags: [
      { id_tag: 1, tag_content: 'Ecológico' },
      { id_tag: 2, tag_content: 'Sustentable' },
      { id_tag: 3, tag_content: 'Ahorro' },
      { id_tag: 4, tag_content: 'Decoración' },
      { id_tag: 5, tag_content: 'Minimalismo' },
      { id_tag: 5, tag_content: 'Minimalismo' }
    ],
    mainImage: [{ id_image: 1, image_content: house111 }],
    images: [
      { id_image: 2, image_content: house112 },
      { id_image: 3, image_content: house113 },
      { id_image: 4, image_content: house114 },
    ]
  },
  {
    id_home: 2,
    home_owner: 2,
    home_name: 'Loft Roma Norte',
    home_on_sale: 0,
    home_all_in: 1,
    home_description: 'Loft moderno con excelente iluminación natural.',
    address: 'Av. Álvaro Obregón 85, CDMX',
    home_ubication: [19.4174, -99.1626],
    tags: [
      { id_tag: 1, tag_content: 'Moderno' },
      { id_tag: 3, tag_content: 'Ahorro' },
      { id_tag: 6, tag_content: 'Conectado' }
    ],
    mainImage: [{ id_image: 1, image_content: house121 }],
    images: [
      { id_image: 2, image_content: house122 },
      { id_image: 3, image_content: house123 },
      { id_image: 4, image_content: house124 },
      { id_image: 4, image_content: house125 },
    ]
  },
  {
    id_home: 3,
    home_owner: 3,
    home_name: 'Departamento Vista al Parque',
    home_on_sale: 1,
    home_all_in: 1,
    home_description: 'Espacio cómodo con vista privilegiada al parque central.',
    address: 'Calle del Parque 456, Guadalajara',
    home_ubication: [20.6765, -103.3476],
    tags: [
      { id_tag: 2, tag_content: 'Sustentable' },
      { id_tag: 4, tag_content: 'Decoración' },
      { id_tag: 7, tag_content: 'Pet Friendly' }
    ],
    mainImage: [{ id_image: 1, image_content: room121 }],
    images: [
    ]
  }
]

export const DUMMY_PENDING_ROOMS = [
  {
    id_room: 1,
    id_home: 1,
    room_ocupied: 0,
    room_price: 4500,
    romm_description: 'Habitación con luz natural y clóset amplio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
      {
        id_tag: 6,
        tag_content: 'Moderno'
      },
      {
        id_tag: 7,
        tag_content: 'Luz natural'
      },
      {
        id_tag: 8,
        tag_content: 'Espacioso'
      }
    ],
    mainImage: [
      {
        id_image: 6,
        image_content: room121
      }
    ],
    images: [
      {
        id_image: 7,
        image_content: room123
      }
    ]
  },
  {
    id_room: 2,
    id_home: 1,
    room_ocupied: 1,
    room_price: 4700,
    romm_description: 'Cuarto amueblado con cama individual y escritorio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
      {
        id_tag: 9,
        tag_content: 'Minimalista'
      },
      {
        id_tag: 10,
        tag_content: 'Vista al jardín'
      },
      {
        id_tag: 11,
        tag_content: 'Silenciosa'
      }
    ],
    mainImage: [
      {
        id_image: 8,
        image_content: room123
      }
    ],
    images: [
      {
        id_image: 9,
        image_content: room122
      }
    ]
  },
  {
    id_room: 3,
    id_home: 1,
    room_ocupied: 0,
    room_price: 4300,
    romm_description: 'Habitación con baño compartido y vista al patio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
      {
        id_tag: 12,
        tag_content: 'Estilo rústico'
      },
      {
        id_tag: 13,
        tag_content: 'Techo alto'
      },
      {
        id_tag: 14,
        tag_content: 'Amueblada'
      }
    ],
    mainImage: [
      {
        id_image: 10,
        image_content: room122
      }
    ],
    images: [
      {
        id_image: 11,
        image_content: room123
      }
    ]
  },
  {
    id_room: 3,
    id_home: 2,
    room_ocupied: 0,
    room_price: 4300,
    romm_description: 'Habitación con baño compartido y vista al patio.',
    home_owner: 1,
    home_name: 'Habitación en Casa Chapultepec',
    tags: [
      {
        id_tag: 12,
        tag_content: 'Estilo rústico'
      },
      {
        id_tag: 13,
        tag_content: 'Techo alto'
      },
      {
        id_tag: 14,
        tag_content: 'Amueblada'
      }
    ],
    mainImage: [
      {
        id_image: 10,
        image_content: room221
      }
    ],
    images: [
      {
        id_image: 11,
        image_content: room222,
        image_content: room223
      }
    ]
  }
]