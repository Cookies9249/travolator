import streamlit as st
import pandas as pd
from streamlit_extras.switch_page_button import switch_page

st.title("Map")

# If a plan has not been made, return back
if 'departure' not in st.session_state or 'destination' not in st.session_state:
    st.error("Please Create a Plan")
    return_back = st.button("Return to Home")

    if return_back:
        switch_page('main')

# NOT REQUIRED
# elif 'attractions' not in st.session_state:
#     st.warning("Please Customize Your Plan")
#     return_back = st.button("View My Plan")

#     if return_back:
#         switch_page('plan')

# Else, continue with page
else:
    left_column, right_column, _ = st.columns((3,3,2))
    with left_column:
        st.write(f"Departing From: {st.session_state['departure']}")
    with right_column:
        st.write(f"Going To: {st.session_state['destination']}")

    # Create a dataframe for coordinate data
    coord_data = []

    for row in st.session_state["attractions"]:
        # Coordinate data
        coord_dict = {}
        coord_dict["lat"], coord_dict["lon"] = row[2], row[3]
        coord_data.append(coord_dict)

    # Map for coordinate data
    st.subheader("Map of Your Plan")
    coord_df = pd.DataFrame(coord_data)
    st.map(coord_df)
