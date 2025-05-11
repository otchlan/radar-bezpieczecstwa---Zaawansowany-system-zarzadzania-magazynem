import folium
import random
import math
from folium.features import DivIcon

# Create a base map centered on Lublin
m = folium.Map(location=[51.2465, 22.5734], zoom_start=12)

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

# Generate 5 Access Points with 1.5km radius circles
access_point_colors = ['#1f78b4'] * 5  # All blue
access_points = []
min_distance = 0.02  # ~2km in degrees

for i in range(5):
    attempts = 0
    while attempts < 100:
        lat = 51.2465 + random.uniform(-0.04, 0.04)
        lon = 22.5734 + random.uniform(-0.04, 0.04)
        new_loc = (lat, lon)
        
        if is_valid_location(new_loc, access_points, min_distance):
            # Create marker with custom icon
            folium.Marker(
                [lat, lon],
                icon=folium.Icon(
                    color='blue',
                    icon='sign-in',
                    prefix='fa'
                ),
                tooltip=f'Access Point {i+1}',
                popup=f'<b>Access Point {i+1}</b><br>Type: Public Entry<br>Services: Info, WiFi, Charging'
            ).add_to(m)
            
            # Add 1.5km radius circle with label
            folium.Circle(
                location=[lat, lon],
                radius=1500,
                color='#1f78b4',
                weight=2,
                fill=True,
                fill_opacity=0.1,
                popup=f'1.5km service radius'
            ).add_to(m)
            
            # Add text label at the center
            folium.map.Marker(
                [lat, lon],
                icon=DivIcon(
                    icon_size=(150,36),
                    icon_anchor=(75,18),
                    html=f'<div style="font-size: 14pt; color: #1f78b4; text-align: center;">AP{i+1}</div>'
                )
            ).add_to(m)
            
            access_points.append(new_loc)
            break
        attempts += 1

# Generate 8 Information Points (green)
info_points = []
min_distance_info = 0.015  # ~1.5km in degrees

for i in range(8):
    attempts = 0
    while attempts < 100:
        lat = 51.2465 + random.uniform(-0.045, 0.045)
        lon = 22.5734 + random.uniform(-0.045, 0.045)
        new_loc = (lat, lon)
        
        # Check distance from other info points and access points
        valid = (is_valid_location(new_loc, info_points, min_distance_info) and 
                is_valid_location(new_loc, access_points, min_distance_info))
        
        if valid:
            folium.Marker(
                [lat, lon],
                icon=folium.Icon(
                    color='green',
                    icon='info-circle',
                    prefix='fa'
                ),
                tooltip=f'Information Point {i+1}',
                popup=f'<b>Information Point {i+1}</b><br>Services: Maps, Guides, Assistance<br>Open: 8AM-8PM'
            ).add_to(m)
            info_points.append(new_loc)
            break
        attempts += 1

# Generate 20 InPost points with golden yellow color (#fbcb04)
inpost_locations = []
min_distance_inpost = 0.008  # ~800m in degrees

for i in range(20):
    attempts = 0
    while attempts < 100:
        lat = 51.2465 + random.uniform(-0.045, 0.045)
        lon = 22.5734 + random.uniform(-0.045, 0.045)
        new_loc = (lat, lon)
        
        # Check distance from other points
        valid = (is_valid_location(new_loc, inpost_locations, min_distance_inpost) and 
                is_valid_location(new_loc, access_points, min_distance_inpost) and
                is_valid_location(new_loc, info_points, min_distance_inpost))
        
        if valid:
            folium.Marker(
                [lat, lon],
                icon=folium.Icon(
                    color='#fbcb04',  # Golden yellow
                    icon_color='#000000',  # Black icon
                    icon='cube',
                    prefix='fa',
                    icon_size=(14, 14),
                    icon_anchor=(7, 7)
                ),
                tooltip=f'InPost {i+1}',
                popup=f'<b>InPost Point {i+1}</b><br>Open 24/7<br>Parcel lockers: 50'
            ).add_to(m)
            inpost_locations.append(new_loc)
            break
        attempts += 1

# Add Legend
legend_html = '''
     <div style="position: fixed; 
                 bottom: 50px; left: 50px; width: 180px; height: 180px; 
                 border:2px solid grey; z-index:9999; font-size:14px;
                 background-color:white;
                 opacity: 0.85;
                 padding: 10px;">
         <p style="margin-top:0"><b>Map Legend</b></p>
         <p style="margin:0"><i class="fa fa-sign-in" style="color:blue"></i> Access Point</p>
         <p style="margin:0"><i class="fa fa-info-circle" style="color:green"></i> Information</p>
         <p style="margin:0"><i class="fa fa-cube" style="color:#fbcb04"></i> InPost</p>
         <div style="width:100%; height:1px; background:gray; margin:5px 0"></div>
         <p style="margin:0"><svg width="20" height="20">
             <circle cx="10" cy="10" r="8" stroke="#1f78b4" stroke-width="2" fill="#1f78b4" fill-opacity="0.1"/>
           </svg> Service Area</p>
         <div style="width:100%; height:1px; background:gray; margin:5px 0"></div>
         <p style="margin:0"><svg width="20" height="20">
             <rect width="20" height="20" fill="none" stroke="#0000ff" stroke-width="2"/>
           </svg> City Boundary</p>
     </div>
'''

m.get_root().html.add_child(folium.Element(legend_html))

# Add layer control and save
folium.LayerControl().add_to(m)
m.save("lublin_map_people.html")
print("Map saved to lublin_map_people.html - open in browser!")