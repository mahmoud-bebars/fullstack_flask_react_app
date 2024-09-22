from app import db, app
from flask import request, jsonify
from models import Friend


# Get All Friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    results = [friend.to_json() for friend in friends]
    return jsonify(results), 200


@app.route("/api/friends/<int:id>", methods=["GET"])
def get_friend(id):
    try:
        # Check if the Record Exist in the database
        exist_friend = Friend.query.get(id)

        if exist_friend is None:
            return jsonify({"msg": f"Friend with ID: {id} Not Found"}), 404
        else:
            return jsonify({"msg": exist_friend.to_json()}), 200

        # retrun the response

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Create a Friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        data = request.json

        # Check for required Feilds
        required_fields = ["name", "role", "description", "gender"]

        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing Required Feild {field}"}), 400

        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        # fetch avatar image based on Gender
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        # create the record with the Model (Friend)
        new_friend = Friend(
            name=name,
            role=role,
            description=description,
            gender=gender,
            img_url=img_url,
        )

        # store the Record in the database
        db.session.add(new_friend)
        # commit the record
        db.session.commit()

        # retrun the response
        return jsonify({"results": new_friend.to_json()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Update a Friend
@app.route("/api/friends/<int:id>", methods=["PUT"])
def update_friend(id):
    try:
        # Read The Request Body
        data = request.json

        # Check if the Record Exist in the database
        friend = Friend.query.get(id)

        if friend is None:
            return jsonify({"msg": f"Friend with ID: {id} Not Found"}), 404
        else:
            friend.name = data.get("name", friend.name)
            friend.role = data.get("role", friend.role)
            friend.description = data.get("description", friend.description)
            friend.gender = data.get("gender", friend.gender)

            # commit the record
            db.session.commit()
            return jsonify({"msg": f"Friend with ID: {id} Updated Successfully"}), 200

        # retrun the response

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Delete a Friend
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id):
    try:
        # Check if the Record Exist in the database
        exist_friend = Friend.query.get(id)

        if exist_friend is None:
            return jsonify({"msg": f"Friend with ID: {id} Not Found"}), 404
        else:
            Friend.query.filter(Friend.id == id).delete()
            # commit the record
            db.session.commit()
            return jsonify({"msg": f"Friend with ID: {id} Delete Successfully"}), 200

        # retrun the response

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
