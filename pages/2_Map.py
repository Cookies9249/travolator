import streamlit as st
import pandas as pd
from streamlit_extras.switch_page_button import switch_page

st.title("Travel Map")

# If a plan has not been made, return back
if 'departure' not in st.session_state or 'destination' not in st.session_state:
    st.error("Please Create a Plan")
    return_back = st.button("Return to Home")

    if return_back:
        switch_page('main')

# NOT REQUIRED
elif 'locations' not in st.session_state:
    st.warning("Please Customize Your Plan")
    return_back = st.button("View My Plan")

    if return_back:
        switch_page('plan')

# Else, continue with page
else:    
    # Create a dataframe for coordinate data
    coord_data = []
    # st.write(st.session_state["locations"])

    for row in st.session_state["locations"]:
        # Coordinate data
        coord_dict = {}
        coord_dict["lat"], coord_dict["lon"] = row["lat"], row["lon"]
        coord_data.append(coord_dict)

    # Map for coordinate data
    st.subheader("Map of Your Plan")
    coord_df = pd.DataFrame(coord_data)
    # st.write(coord_df)
    st.map(coord_df)
