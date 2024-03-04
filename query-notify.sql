-- ######
-- Create Table
DROP TABLE
IF
	EXISTS log_activity;
CREATE TABLE log_activity ( ID SERIAL PRIMARY KEY, TABLE_NAME TEXT, log_name TEXT, event_type TEXT, properties JSONB, username TEXT DEFAULT NULL, event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP );
-- ######
-- Create functions
CREATE 
	OR REPLACE FUNCTION "public"."fn_log_activity" ( ) RETURNS "pg_catalog"."trigger" AS $BODY$ DECLARE
	currentUser TEXT := CURRENT_USER;
-- 	passed_parameter TEXT;
BEGIN
-- 	passed_parameter := TG_ARGV[0]::TEXT;
	IF
		TG_OP = 'INSERT' THEN
			INSERT INTO log_activity ( TABLE_NAME, log_name, event_type, properties, username )
		VALUES
			( 'dim_customer', 'Insert Customer Row', 'INSERT', jsonb_build_object ( 'new', row_to_json ( NEW ) ), currentUser );
		RETURN NEW;
		ELSIF TG_OP = 'UPDATE' THEN
			INSERT INTO log_activity ( TABLE_NAME, log_name, event_type, properties, username )
			VALUES
				( 'dim_customer', 'Update Customer Row', 'UPDATE', jsonb_build_object ( 'new', row_to_json ( NEW ), 'old', row_to_json ( OLD ) ), currentUser );
			RETURN NEW;
			ELSIF TG_OP = 'DELETE' THEN
				INSERT INTO log_activity ( TABLE_NAME, log_name, event_type, properties, username )
				VALUES
					( 'dim_customer', 'Delete Customer Row', 'DELETE', jsonb_build_object ( 'old', row_to_json ( OLD ) ), currentUser );
				RETURN OLD;
				
			END IF;
			
		END;
		$BODY$ LANGUAGE plpgsql VOLATILE COST 100;
-- ######		
-- Trigger for INSERT
		DROP TRIGGER
		IF
			EXISTS tr_dim_customer_after_insert ON customers;
		CREATE TRIGGER tr_dim_customer_after_insert AFTER INSERT ON customers FOR EACH ROW
		EXECUTE FUNCTION fn_log_activity ( );
-- EXECUTE FUNCTION fn_log_activity('passed_parameter');
-- ######
-- Trigger for UPDATE
		DROP TRIGGER
		IF
			EXISTS tr_dim_customer_after_update ON customers;
		CREATE TRIGGER tr_dim_customer_after_update AFTER UPDATE ON customers FOR EACH ROW
		EXECUTE FUNCTION fn_log_activity ( );
-- EXECUTE FUNCTION fn_log_activity('passed_parameter');
-- ######
-- Trigger for DELETE
		DROP TRIGGER
		IF
			EXISTS tr_dim_customer_after_delete ON customers;
		CREATE TRIGGER tr_dim_customer_after_delete AFTER DELETE ON customers FOR EACH ROW
	EXECUTE FUNCTION fn_log_activity ( );
-- EXECUTE FUNCTION fn_log_activity('passed_parameter');