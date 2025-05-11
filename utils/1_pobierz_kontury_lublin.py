import requests
import geojson
from geojson import Feature, FeatureCollection

def pobierz_kontury_lublina():
    # Zapytanie do Overpass API
    overpass_url = "https://overpass-api.de/api/interpreter"
    query = """
    [out:json];
    area["name"="Polska"]->.country;
    relation["boundary"="administrative"]
      ["admin_level"="8"]
      ["name"="Lublin"]
      (area.country);
    out geom;
    """
    
    # Wykonaj zapytanie
    response = requests.post(overpass_url, data=query)
    data = response.json()

    # Przetwórz wyniki
    features = []
    for element in data["elements"]:
        if element["type"] == "relation":
            # Ekstrakcja współrzędnych z geometrii
            coordinates = []
            for member in element["members"]:
                if member["type"] == "way":
                    way_coords = []
                    for node in member["geometry"]:
                        way_coords.append([node["lon"], node["lat"]])
                    coordinates.append(way_coords)
            
            # Utwórz obiekt GeoJSON
            feature = Feature(
                geometry={
                    "type": "MultiPolygon",
                    "coordinates": [coordinates]
                },
                properties={
                    "name": element["tags"].get("name", ""),
                    "teryt": element["tags"].get("ref:TERYT", "")
                }
            )
            features.append(feature)

    # Zapisz do pliku
    with open("lublin_contour.geojson", "w") as f:
        geojson.dump(FeatureCollection(features), f, indent=2)

if __name__ == "__main__":
    pobierz_kontury_lublina()
    print("Kontury gminy Lublin zostały zapisane do pliku lublin_contour.geojson")
