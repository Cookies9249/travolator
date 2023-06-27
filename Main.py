import streamlit as st
from streamlit_extras.switch_page_button import switch_page
from PIL import Image

def main():
    # Configs
    st.set_page_config(page_title="Travolator", page_icon=":earth_americas:", layout="wide")
    background = Image.open('background.jpg')

    # Website
    left_column, _, right_column = st.columns((3, 1, 4))
    with left_column:
        st.subheader("Making Travel Plans With Ease")
        st.title("Travolator")

        departure = st.text_input("Departure", placeholder="Departing From")
        destination = st.text_input("Destination", placeholder="Going To")

        st.write("###")
        create_plan = st.button("Create a Plan!")

    with right_column:
        st.image(background)

    if create_plan:
        if departure == '':
            st.error("Please Enter a Departure Location")
        elif destination == '':
            st.error("Please Enter a Destination")
        else:
            st.session_state['departure'] = departure
            st.session_state['destination'] = destination
            switch_page('plan')

if __name__ == '__main__':
	main()