const fs = require('fs');
let code = fs.readFileSync('src/sections/PujaMap.tsx', 'utf8');

const effectCode = `
  // Auto-fetch POIs when location is available
  useEffect(() => {
    if (geo.status === 'success' && geo.lat && geo.lng && pois.length === 0) {
      let isMounted = true;
      const fetchInitial = async () => {
        setPoiLoading(true);
        const types: POIType[] = ['hospital', 'police', 'atm', 'toilets'];
        const fetched = await fetchPOIs(geo.lat, geo.lng, 3000, types);
        if (isMounted) {
          setPois(fetched);
          setActivePoiTypes(new Set(types));
          setPoiLoading(false);
        }
      };
      fetchInitial();
      return () => { isMounted = false; };
    }
  }, [geo.status, geo.lat, geo.lng]);
`;

code = code.replace(/const \[pois, setPois\] = useState<POI\[\]>\(\[\]\);/, "const [pois, setPois] = useState<POI[]>([]);\n" + effectCode);

fs.writeFileSync('src/sections/PujaMap.tsx', code, 'utf8');
console.log('Fixed POI Auto Fetch');
