// Data Wilayah, Indikator, dan Mock Generator
export const REGIONS = [
  { id: '3501', name: 'kabupaten Pacitan', lat: -8.2035, lng: 111.1444 },
  { id: '3502', name: 'kabupaten Ponorogo', lat: -7.9711, lng: 111.4920 },
  { id: '3503', name: 'kabupaten Trenggalek', lat: -8.1755, lng: 111.6601 },
  { id: '3504', name: 'kabupaten Tulungagung', lat: -8.1147, lng: 111.9366 },
  { id: '3505', name: 'kabupaten Blitar', lat: -8.1347, lng: 112.2199 },
  { id: '3506', name: 'kabupaten Kediri', lat: -7.8300, lng: 112.1500 },
  { id: '3507', name: 'kabupaten Malang', lat: -8.1636, lng: 112.5714 },
  { id: '3508', name: 'kabupaten Lumajang', lat: -8.1332, lng: 113.2223 },
  { id: '3509', name: 'kabupaten Jember', lat: -8.1724, lng: 113.7005 },
  { id: '3510', name: 'kabupaten Banyuwangi', lat: -8.2192, lng: 114.3691 },
  { id: '3511', name: 'kabupaten Bondowoso', lat: -7.9392, lng: 113.8447 },
  { id: '3512', name: 'kabupaten Situbondo', lat: -7.7569, lng: 114.0538 },
  { id: '3513', name: 'kabupaten Probolinggo', lat: -7.8697, lng: 113.3137 },
  { id: '3514', name: 'kabupaten Pasuruan', lat: -7.7470, lng: 112.8360 },
  { id: '3515', name: 'kabupaten Sidoarjo', lat: -7.4478, lng: 112.7183 },
  { id: '3516', name: 'kabupaten Mojokerto', lat: -7.5516, lng: 112.4897 },
  { id: '3517', name: 'kabupaten Jombang', lat: -7.5457, lng: 112.2323 },
  { id: '3518', name: 'kabupaten Nganjuk', lat: -7.6033, lng: 111.9011 },
  { id: '3519', name: 'kabupaten Madiun', lat: -7.5996, lng: 111.6617 },
  { id: '3520', name: 'kabupaten Magetan', lat: -7.6496, lng: 111.3359 },
  { id: '3521', name: 'kabupaten Ngawi', lat: -7.4208, lng: 111.3965 },
  { id: '3522', name: 'kabupaten Bojonegoro', lat: -7.2655, lng: 111.8384 },
  { id: '3523', name: 'kabupaten Tuban', lat: -6.8953, lng: 112.0460 },
  { id: '3524', name: 'kabupaten Lamongan', lat: -7.1283, lng: 112.3165 },
  { id: '3525', name: 'kabupaten Gresik', lat: -7.1539, lng: 112.6561 },
  { id: '3526', name: 'kabupaten Bangkalan', lat: -7.0270, lng: 112.9463 },
  { id: '3527', name: 'kabupaten Sampang', lat: -7.0984, lng: 113.2687 },
  { id: '3528', name: 'Kabupaten Pamekasan', lat: -7.1566, lng: 113.4862 },
  { id: '3529', name: 'kabupaten Sumenep', lat: -6.9961, lng: 113.9114 },
  { id: '3571', name: 'Kota Kediri', lat: -7.8480, lng: 112.0178 },
  { id: '3572', name: 'Kota Blitar', lat: -8.0954, lng: 112.1609 },
  { id: '3573', name: 'Kota Malang', lat: -7.9666, lng: 112.6326 },
  { id: '3574', name: 'Kota Probolinggo', lat: -7.7543, lng: 113.2159 },
  { id: '3575', name: 'Kota Pasuruan', lat: -7.6453, lng: 112.9075 },
  { id: '3576', name: 'Kota Mojokerto', lat: -7.4726, lng: 112.4381 },
  { id: '3577', name: 'Kota Madiun', lat: -7.6296, lng: 111.5176 },
  { id: '3578', name: 'Kota Surabaya', lat: -7.2575, lng: 112.7521 },
  { id: '3579', name: 'Kota Batu', lat: -7.8671, lng: 112.5239 },
];

export const INDICATORS = [
  { 
    id: 'ind_1', 
    table_name: 'desa_yg_memiliki_sarana_kesehatan_cl', 
    name: 'Desa Memiliki Sarana Kesehatan', 
    unit: 'Desa', 
    color: '#ec4899', 
    categories: ['Puskesmas', 'Pustu', 'Polindes'],
    type: 'positive' 
  },
  { 
    id: 'ind_2', 
    table_name: 'kasus_penyakit_cl',
    name: 'Kasus Penyakit', 
    unit: 'Kasus', 
    color: '#e11d48', 
    categories: ['DBD', 'Diare', 'Malaria', 'TBC'],
    type: 'negative' 
  },
  { 
    id: 'ind_3', 
    table_name: 'tenaga_kesehatan_cl',
    name: 'Jumlah Tenaga Kesehatan', 
    unit: 'Orang', 
    color: '#db2777', 
    categories: ['Dokter Spesialis', 'Dokter Umum', 'Perawat', 'Bidan'],
    type: 'positive' 
  },
  { 
    id: 'ind_4', 
    table_name: 'sarana_kesehatan_cl',
    name: 'Jumlah Sarana Kesehatan', 
    unit: 'Unit', 
    color: '#be185d', 
    categories: ['Rumah Sakit Umum', 'Rumah Sakit Khusus', 'Puskesmas'],
    type: 'positive' 
  },
  { 
    id: 'ind_5', 
    table_name: 'penduduk_yg_memiliki_jaminan_kesehatan_cl', 
    name: 'Penduduk Jaminan Kesehatan', 
    unit: 'Jiwa', 
    color: '#9d174d', 
    categories: ['BPJS Kesehatan', 'Jamkesda', 'Asuransi Swasta'],
    type: 'positive' 
  }
];

export const COLORS = ['#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#f472b6', '#fb7185', '#f9a8d4'];

const INITIAL_MOCK_DB: any = {
  desa_yg_memiliki_sarana_kesehatan_cl: [],
  kasus_penyakit_cl: [],
  tenaga_kesehatan_cl: [],
  sarana_kesehatan_cl: [],
  penduduk_yg_memiliki_jaminan_kesehatan_cl: []
};

export const generateMockData = () => {
  const years = [2019, 2020, 2021, 2022, 2023, 2024];
  const regionsWithProv = [...REGIONS, { id: '3500', name: 'Jawa Timur', lat: 0, lng: 0 }];
  const mockDB = JSON.parse(JSON.stringify(INITIAL_MOCK_DB));

  INDICATORS.forEach(ind => {
    if (!mockDB[ind.table_name]) mockDB[ind.table_name] = [];
    let rowId = 1;
    regionsWithProv.forEach(region => {
      const cleanName = region.name === 'Jawa Timur' ? 'Jawa Timur' : region.name; 
      years.forEach((year, yIdx) => {
        ind.categories.forEach((cat, cIdx) => {
          let baseVal = region.name === 'Jawa Timur' ? 15000 : 300; 
          if (ind.type === 'negative') baseVal = region.name === 'Jawa Timur' ? 5000 : 100;
          
          const growthFactor = 1 + (yIdx * 0.05);
          const randomVal = Math.floor(baseVal * growthFactor + (Math.random() * baseVal * 0.1));

          mockDB[ind.table_name].push({
            id: rowId++,
            id_kategori: cIdx + 1,
            tahun: year,
            kabupatenkota: cleanName,
            kategori: cat,
            jumlah: randomVal
          });
        });
      });
    });
  });
  return mockDB;
};