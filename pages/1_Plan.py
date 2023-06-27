import streamlit as st
from plan import plan
from streamlit_extras.switch_page_button import switch_page

st.title("Travel Plan")

# If a plan has not been made, return back
if 'departure' not in st.session_state or 'destination' not in st.session_state:
    st.error("Please Create a Plan")
    return_back = st.button("Return to Home")

    if return_back:
        switch_page('main')

else:  
    data = plan(departure=st.session_state['departure'], destination=st.session_state['destination'])
    st.session_state["locations"] = data
