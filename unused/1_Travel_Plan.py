import streamlit as st
import pandas as pd
from streamlit_extras.switch_page_button import switch_page

st.title("Plan")

# If a plan has not been made, return back
if 'departure' not in st.session_state or 'destination' not in st.session_state:
    st.error("Please Create a Plan")
    return_back = st.button("Return to Home")

    if return_back:
        switch_page('main')

# Else, continue with page
else:
    left_column, right_column, _ = st.columns((3,3,2))
    with left_column:
        st.write(f"Departing From: {st.session_state['departure']}")
    with right_column:
        st.write(f"Going To: {st.session_state['destination']}")

    # Prompt ChatGPT
    # Generate a list of tourist attractions between {st.session_state['departure']} and {st.session_state['destination']}.
    # Respond with python list with format ["Name","Address","Lat","Long"].
    # Include the start and end locations in the list.

    # Example Response:
    st.session_state["attractions"] = [
    ["CN Tower", "301 Front St W, Toronto, ON M5V 2T6", 43.6426, -79.3871],
    ["Royal Ontario Museum", "100 Queen's Park, Toronto, ON M5S 2C6", 43.6677, -79.3948],
    ["Casa Loma", "1 Austin Terrace, Toronto, ON M5R 1X8", 43.6780, -79.4097],
    ["Niagara Falls", "Niagara Falls, ON, Canada", 43.0896, -79.0849],
    ["Thousand Islands", "Gananoque, ON K7G 2V4", 44.3354, -76.1597],
    ["Parliament Hill", "Wellington St, Ottawa, ON K1A 0A9", 45.4236, -75.7009],
    ["Rideau Canal", "Ottawa, ON, Canada", 45.4237, -75.6994]
    ]

    # Create a dataframe for general data
    data = []

    for row in st.session_state["attractions"]:
        # Regular data
        dict = {}
        dict["Attraction"], dict["Address"] = row[0], row[1]
        data.append(dict)

    # Dataframe for regular data
    st.subheader("Your Generated Plan")
    df = pd.DataFrame(data)
    st.dataframe(df)