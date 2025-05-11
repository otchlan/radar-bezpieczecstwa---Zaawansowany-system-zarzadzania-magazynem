import folium
import random
import math
from folium.features import DivIcon
from branca.element import Template, MacroElement

# Create a base map centered on Lublin
m = folium.Map(location=[51.2465, 22.5734], zoom_start=11)

# Add GeoJSON layer for Lublin boundaries
geojson_layer = folium.GeoJson(
    "lublin_contour.geojson",
    name="Lublin Municipality",
    style_function=lambda x: {'fillColor': '#ffff00', 'color': '#0000ff', 'fillOpacity': 0.2}
).add_to(m)

# Add popup with properties
folium.features.GeoJsonPopup(
    fields=['name', 'teryt'],
    labels=True
).add_to(geojson_layer)

# Function to check minimum distance between points
def is_valid_location(new_loc, existing_locs, min_distance):
    for loc in existing_locs:
        if math.sqrt((new_loc[0]-loc[0])**2 + (new_loc[1]-loc[1])**2) < min_distance:
            return False
    return True

# Generate 5 internal supply magazines with 1.5km radius circles
internal_magazine_colors = ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00']
internal_magazines = []
min_distance = 0.02  # ~2km in degrees

for i in range(5):
    attempts = 0
    while attempts < 100:
        lat = 51.2465 + random.uniform(-0.04, 0.04)
        lon = 22.5734 + random.uniform(-0.04, 0.04)
        new_loc = (lat, lon)
        
        if is_valid_location(new_loc, internal_magazines, min_distance):
            # Create marker with custom icon
            # Losowa ilość magazynowa między 400 a 1000 jednostek
            stock_amount = random.randint(400, 1000)
            status = "Pełny" if stock_amount > 900 else "Optymalny" if stock_amount > 600 else "Niski"
            
            folium.Marker(
                [lat, lon],
                icon=folium.Icon(
                    color=internal_magazine_colors[i],
                    icon='shopping-basket',
                    prefix='fa'
                ),
                tooltip=f'''
                <div style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">Magazyn Żywnościowo-Sanitarny {i+1}</div>
                <div style="font-size: 12px;">
                    <b>Pojemność maksymalna:</b> 1000 jednostek<br>
                    <b>Aktualna ilość:</b> {stock_amount} jednostek<br>
                    <b>Zawartość:</b> Żywność, leki, środki higieniczne<br>
                    <b>Status:</b> <span style="color: {'red' if status == 'Pełny' else 'green' if status == 'Optymalny' else 'orange'}">{status}</span><br>
                    <b>Promień obsługi:</b> 1.5km
                </div>
                ''',
                popup=f'<b>Magazyn Żywnościowo-Sanitarny {i+1}</b><br>Pojemność maksymalna: 1000 jednostek<br>Aktualna ilość: {stock_amount} jednostek<br>Zawartość: Żywność, leki, środki higieniczne<br>Status: {status}'
            ).add_to(m)
            
            # Add 1.5km radius circle with label
            folium.Circle(
                location=[lat, lon],
                radius=1500,
                color=internal_magazine_colors[i],
                weight=2,
                fill=True,
                fill_opacity=0.1,
                tooltip=f'Promień obsługi 1.5km',
                popup=f'Obszar obsługi magazynu {i+1}'
            ).add_to(m)
            
            # Add text label at the center
            folium.map.Marker(
                [lat, lon],
                icon=DivIcon(
                    icon_size=(150,36),
                    icon_anchor=(75,18),
                    html=f'<div style="font-size: 14pt; color: {internal_magazine_colors[i]}; text-align: center;">ŻS{i+1}</div>'
                )
            ).add_to(m)
            
            # Dodanie etykiety tekstowej z odległością do każdego magazynu zewnętrznego
            for j, loc in enumerate(external_locations):
                distance = int(math.sqrt((loc[0]-lat)**2 + (loc[1]-lon)**2) * 100)  # Przybliżona odległość w km
                
                # Dodanie linii łączącej magazyn wewnętrzny z najbliższym magazynem zewnętrznym
                if j == i % len(external_locations):  # tylko dla wybranych połączeń
                    folium.PolyLine(
                        locations=[loc, [lat, lon]],
                        color=internal_magazine_colors[i % len(internal_magazine_colors)],
                        weight=1.5,
                        opacity=0.7,
                        dash_array='5, 10',
                        tooltip=f'Trasa dostawy: {distance} km'
                    ).add_to(m)
            
            internal_magazines.append(new_loc)
            break
        attempts += 1

# Generate external vault magazines (outside boundaries)
external_magazines = []
external_locations = [
    [51.32, 22.65],  # Northeast
    [51.18, 22.45],  # Southwest
    [51.22, 22.85],  # East
    [51.35, 22.50],  # North
    [51.16, 22.65],  # South
    [51.28, 22.40],  # West
    [51.30, 22.75]   # Northeast 2
]

# Generate 20 InPost points with golden yellow color (#fbcb04)
inpost_locations = []
min_distance_inpost = 0.008  # ~800m in degrees

# Generowanie magazynów zasobów (paliwo i inne)
resource_magazines = []
resource_magazine_colors = ['#ff7f00', '#a65628', '#f781bf', '#999999']
min_distance_resource = 0.02  # ~2km w stopniach

for i in range(4):
    attempts = 0
    while attempts < 100:
        lat = 51.2465 + random.uniform(-0.042, 0.042)
        lon = 22.5734 + random.uniform(-0.042, 0.042)
        new_loc = (lat, lon)
        
        # Sprawdzanie, czy lokalizacja nie jest zbyt blisko innych magazynów
        if (is_valid_location(new_loc, internal_magazines, min_distance_resource/2) and 
            is_valid_location(new_loc, resource_magazines, min_distance_resource)):
            
            # Losowa ilość paliwa między 1000 a 5000 litrów
            fuel_amount = random.randint(1000, 5000)
            equipment_amount = random.randint(300, 800)
            status = "Pełny" if fuel_amount > 4500 else "Optymalny" if fuel_amount > 2500 else "Niski"
            
            folium.Marker(
                [lat, lon],
                icon=folium.Icon(
                    color=resource_magazine_colors[i % len(resource_magazine_colors)],
                    icon='gas-pump',
                    prefix='fa'
                ),
                tooltip=f'''
                <div style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">Magazyn Zasobów {i+1}</div>
                <div style="font-size: 12px;">
                    <b>Paliwo:</b> {fuel_amount} litrów<br>
                    <b>Sprzęt techniczny:</b> {equipment_amount} jednostek<br>
                    <b>Zawartość:</b> Paliwo, oleje, części zamienne<br>
                    <b>Status:</b> <span style="color: {'red' if status == 'Pełny' else 'green' if status == 'Optymalny' else 'orange'}">{status}</span><br>
                    <b>Promień obsługi:</b> 1.2km
                </div>
                ''',
                popup=f'<b>Magazyn Zasobów {i+1}</b><br>Paliwo: {fuel_amount} litrów<br>Sprzęt: {equipment_amount} jednostek<br>Zawartość: Paliwo, oleje, części zamienne<br>Status: {status}'
            ).add_to(m)
            
            # Dodanie okręgu o promieniu 1.2km
            folium.Circle(
                location=[lat, lon],
                radius=1200,
                color=resource_magazine_colors[i % len(resource_magazine_colors)],
                weight=2,
                fill=True,
                fill_opacity=0.1,
                tooltip=f'Promień obsługi 1.2km'
            ).add_to(m)
            
            # Dodanie etykiety tekstowej
            folium.map.Marker(
                [lat, lon],
                icon=DivIcon(
                    icon_size=(150,36),
                    icon_anchor=(75,18),
                    html=f'<div style="font-size: 14pt; color: {resource_magazine_colors[i % len(resource_magazine_colors)]}; text-align: center;">MZ{i+1}</div>'
                )
            ).add_to(m)
            
            resource_magazines.append(new_loc)
            break
        attempts += 1

for i in range(20):
    attempts = 0
    while attempts < 100:
        lat = 51.2465 + random.uniform(-0.045, 0.045)
        lon = 22.5734 + random.uniform(-0.045, 0.045)
        new_loc = (lat, lon)
        
        # Check distance from other InPost and from magazines
        valid = (is_valid_location(new_loc, inpost_locations, min_distance_inpost) and 
                is_valid_location(new_loc, internal_magazines, min_distance_inpost/2))
        
        if valid:
            # Losowa liczba paczek w skrytkach między 0 a 50
            parcels = random.randint(0, 50)
            status = "Pełny" if parcels > 45 else "Optymalny" if parcels > 20 else "Prawie pusty"
            
            folium.Marker(
                [lat, lon],
                icon=folium.Icon(
                    color='#fbcb04',  # Golden yellow color
                    icon_color='#000000',  # Black icon
                    icon='cube',
                    prefix='fa'
                ),
                tooltip=f'''
                <div style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">Paczkomat InPost {i+1}</div>
                <div style="font-size: 12px;">
                    <b>Czynny:</b> 24/7<br>
                    <b>Zajęte skrytki:</b> {parcels}/50<br>
                    <b>Status:</b> <span style="color: {'red' if status == 'Pełny' else 'green' if status == 'Optymalny' else 'blue'}">{status}</span><br>
                    <b>Ostatnia dostawa:</b> {random.randint(1, 24)} godz. temu
                </div>
                ''',
                popup=f'<b>Paczkomat InPost {i+1}</b><br>Czynny 24/7<br>Zajęte skrytki: {parcels}/50<br>Status: {status}'
            ).add_to(m)
            inpost_locations.append(new_loc)
            break
        attempts += 1

# Add custom legend
legend_html = '''
{% macro html(this, kwargs) %}
<div style="
    position: fixed; 
    bottom: 50px; 
    left: 50px; 
    width: 220px; 
    height: auto; 
    z-index:9999; 
    font-size:12px;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    ">
    <div style="margin-bottom: 8px;"><strong>Legenda mapy</strong></div>
    
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <i class="fa fa-shopping-basket fa-lg" style="color: #e41a1c; margin-right: 8px;"></i>
        <span>Magazyn żywnościowo-sanitarny (ŻS1-ŻS5)</span>
    </div>
    
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="width: 15px; height: 15px; border-radius: 50%; border: 2px solid #e41a1c; background-color: rgba(228, 26, 28, 0.1); margin-right: 8px;"></div>
        <span>Promień obsługi (1.5km)</span>
    </div>
    
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <i class="fa fa-gas-pump fa-lg" style="color: #ff7f00; margin-right: 8px;"></i>
        <span>Magazyn zasobów (MZ1-MZ4)</span>
    </div>
    
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <div style="width: 15px; height: 15px; border-radius: 50%; border: 2px solid #ff7f00; background-color: rgba(255, 127, 0, 0.1); margin-right: 8px;"></div>
        <span>Promień obsługi (1.2km)</span>
    </div>
    
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
        <i class="fa fa-cube fa-lg" style="color: #000000; background-color: #fbcb04; padding: 2px; margin-right: 8px;"></i>
        <span>Punkt InPost</span>
    </div>
    
    <div style="margin-top: 10px; font-size: 11px; color: #555;">
        <strong>Wskazówka:</strong> Najedź na punkt, aby zobaczyć szczegółowe informacje o stanie magazynu.
    </div>
</div>
{% endmacro %}
'''

# Create custom legend element
legend = MacroElement()
legend._template = Template(legend_html)
m.get_root().add_child(legend)

# Add layer control and save
folium.LayerControl().add_to(m)
m.save("lublin_map.html")
print("Map saved to lublin_map.html - open in browser!")